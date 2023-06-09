const hre = require('hardhat');
const fs = require('fs-extra');
const colors = require('colors');
const readline = require('readline/promises');


async function main() {
    const contractFactory = await hre.ethers.getContractFactory('SimpleStorage');
    console.log(`正在部署合约...`);
    const baseContract = await contractFactory.deploy();
    const contractDeployed = await baseContract.waitForDeployment();
    const contractAddress = await contractDeployed.getAddress();
    console.log(`合约部署成功，地址为：${contractAddress}`.green);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }
);

