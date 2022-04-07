const { ApiPromise, WsProvider } = require('@polkadot/api')
const types = require('@polkadot/types-known/upgrades')

const chainData = require('../data/index.js')

async function retrieveMetadata(chain, version) {
  const providerURL = chainData.specs[chain].url
  const { CustomTypes } = chainData.prebuilt[chain]

  const provider = new WsProvider(providerURL)
  const api = await ApiPromise.create({
    provider,
    ...CustomTypes,
  })

  let metadata, specVersion, transactionVersion
  if (version) {
    const { versions } = types.default.find(({ network }) => network === chain.toLowerCase())
    const { blockNumber } = versions.find(({ specVersion }) => parseInt(specVersion, 10) === version) || {}

    if (!blockNumber) throw new Error(`The requested version ${version} was not found`)

    const blockHash = await api.rpc.chain.getBlockHash(blockNumber)
    metadata = await api.rpc.state.getMetadata(blockHash)
    const rt = await api.rpc.state.getRuntimeVersion(blockHash)

    specVersion = rt.specVersion.toString()
    transactionVersion = rt.transactionVersion.toString()
  } else {
    metadata = await api.rpc.state.getMetadata()

    specVersion = api.runtimeVersion.specVersion.toString()
    transactionVersion = api.runtimeVersion.transactionVersion.toString()
  }

  return {
    specVersion,
    transactionVersion,
    data: JSON.parse(JSON.stringify(metadata, null, 1)),
  }
}

module.exports = {
  retrieveMetadata,
}
