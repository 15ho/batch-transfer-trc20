const BatchTransfer = artifacts.require('../contracts/BatchTransfer.sol');

module.exports = function (deployer) {
  deployer.deploy(BatchTransfer);
};