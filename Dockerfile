# Based on https://nextjs.org/docs/deployment
# Install dependencies only when needed
FROM node:lts-alpine AS base
RUN apk --no-cache --update add libc6-compat git npm python3 make g++ vips-dev

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=base /app/public ./public
COPY --from=base --chown=nextjs:nodejs /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

USER nextjs
EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
RUN npx next telemetry disable

CMD ["node_modules/.bin/next", "start"]
