const BatchTransferV2 = artifacts.require('../contracts/BatchTransferV2.sol');

module.exports = function (deployer) {
  deployer.deploy(BatchTransferV2);
};