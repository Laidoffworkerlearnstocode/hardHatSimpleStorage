const hre = require('hardhat');
const { expect, assert } = require('chai');

describe (
    "testSimpleStorage", function () {
        let simpleStorage;
        beforeEach(async function () {
            const contractFactory = await hre.ethers.getContractFactory('SimpleStorage');
            console.log(`正在部署合约...`.blue);
            simpleStorage = await contractFactory.deploy();
            const simpleStorageAddress = await simpleStorage.getAddress();
            console.log(`合约部署成功，地址为：${simpleStorageAddress},开始测试`.green);
        })
        it("should have a favotite number of 10", async function () {
            const currentNumber = await simpleStorage.retrieve()
            expect(currentNumber).to.equal(10);
        })
        it("should uodate when we call store", async function () {
            await simpleStorage.store(13);
            const currentNumber = await simpleStorage.retrieve();
            expect(currentNumber).to.equal(13);
        })
    }
)