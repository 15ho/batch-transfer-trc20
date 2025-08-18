const MyToken = artifacts.require("MyToken");
const BatchTransfer = artifacts.require("BatchTransfer");
const BatchTransferV2 = artifacts.require("BatchTransferV2");

contract('batchTransfer', async accounts => {
    it ('v1', async () => { 
        const myToken = await MyToken.deployed();
        const batchTransfer = await BatchTransfer.deployed();

        await myToken.approve(batchTransfer.address, 100_000_000);
        await batchTransfer.batchTransfer(myToken.address, [accounts[1], accounts[2], accounts[3]], [50_000_000, 30_000_000, 20_000_000]);

        const b1 = await myToken.balanceOf(accounts[1]);
        assert.equal(b1, 50_000_000);
        const b2 = await myToken.balanceOf(accounts[2]);
        assert.equal(b2, 30_000_000);
        const b3 = await myToken.balanceOf(accounts[3]);
        assert.equal(b3, 20_000_000);

        const txHash = await batchTransfer.batchTransfer(myToken.address, [accounts[4]], [1]);
        const tx = await tronWeb.trx.getTransaction(txHash);
        assert.equal(tx.ret[0].ret, "FAILED");
        const b4 = await myToken.balanceOf(accounts[4]);
        assert.equal(b4, 0);
    });

    it ('v2', async () => { 
        const myToken = await MyToken.deployed();
        const batchTransfer = await BatchTransferV2.deployed();

        await myToken.approve(batchTransfer.address, 10_000_000);
        await batchTransfer.batchTransfer(myToken.address, [accounts[1], accounts[2], accounts[3]], [5_000_000, 3_000_000, 2_000_000]);

        const b1 = await myToken.balanceOf(accounts[1]);
        assert.equal(b1, 55_000_000);
        const b2 = await myToken.balanceOf(accounts[2]);
        assert.equal(b2, 33_000_000);
        const b3 = await myToken.balanceOf(accounts[3]);
        assert.equal(b3, 22_000_000);

        const txHash = await batchTransfer.batchTransfer(myToken.address, [accounts[4]], [1]);
        const tx = await tronWeb.trx.getTransaction(txHash);
        assert.equal(tx.ret[0].ret, "FAILED");
        const b4 = await myToken.balanceOf(accounts[4]);
        assert.equal(b4, 0);
    });
})