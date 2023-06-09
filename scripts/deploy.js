const hre = require('hardhat');
const colors = require('colors');
require('dotenv').config();

async function main() {
    const signers = await hre.ethers.getSigners();
    const deployer = signers[0];
    const contractFactory = await hre.ethers.getContractFactory('SimpleStorage', deployer);
    console.log(`正在部署合约...`);
    const contract = await contractFactory.deploy();
    const contractDeployed = await contract.waitForDeployment();
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

