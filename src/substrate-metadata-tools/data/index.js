const kusamaSpecs = require('./kusama/specs')
const polkadotSpecs = require('./polkadot/specs')

const kusamaPrebuilt = require('./kusama/prebuilt')
const polkadotPrebuilt = require('./polkadot/prebuilt')

module.exports = {
  specs: {
    polkadot: polkadotSpecs,
    kusama: kusamaSpecs,
  },
  prebuilt: {
    polkadot: polkadotPrebuilt,
    kusama: kusamaPrebuilt,
  },
}
