const types = require('@polkadot/types-known/upgrades')

const getVersions = chain => {
  const { versions } = types.default.find(({ network }) => network === chain.toLowerCase())
  return JSON.parse(JSON.stringify(versions))
}

module.exports = { getVersions }
