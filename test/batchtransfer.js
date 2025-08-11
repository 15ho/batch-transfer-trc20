const MyToken = artifacts.require("MyToken");
const BatchTransfer = artifacts.require("BatchTransfer");

contract('batchTransfer', async accounts => {
    it ('batchTransfer', async () => { 
        await MyToken.deployed();
        await BatchTransfer.deployed();
        await BatchTransfer.methods.batchTransfer(MyToken.address, accounts, 100).send({
            from: accounts[0],
            shouldPollResponse: true
        });
    });
})