const { isChainSupported, Chains } = require('./config')
const { generateReport } = require('./genReport')
const { retrieveMetadata } = require('./retrieveMetadata')
const { getVersions } = require('./getVersions')

const genReport = (chain, data) => {
  if (!isChainSupported(chain)) throw new Error(`Chain ${chain} is not supported`)

  return generateReport(chain, data)
}

const getMetadata = (chain, version) => {
  if (!isChainSupported(chain)) throw new Error(`Chain ${chain} is not supported`)

  return retrieveMetadata(chain, version)
}

const getVersionsAvb = chain => {
  if (!isChainSupported(chain)) throw new Error(`Chain ${chain} is not supported`)

  return getVersions(chain)
}

const getSupportedChains = () => {
  return Object.values(Chains)
}

module.exports = { genReport, getMetadata, getVersionsAvb, getSupportedChains }
