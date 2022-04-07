const Chains = {
  kusama: 'kusama',
  polkadot: 'polkadot',
}

function isChainSupported(chain) {
  return Object.prototype.hasOwnProperty.call(Chains, chain)
}

module.exports = {
  isChainSupported,
  Chains,
}
