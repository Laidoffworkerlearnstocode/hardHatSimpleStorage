const ethers = require('ethers');
const fs = require('fs-extra');
const colors = require('colors');
const readline = require('readline/promises');

require('dotenv').config();

async function restoreKey() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const password = await rl.question('请输入密码: ');
    rl.close();
    try {
        const encryptedKeyStore = await fs.readFile("./keystoreSepolia.json", "utf-8");
        const wallet = await ethers.Wallet.fromEncryptedJson(encryptedKeyStore, password);
        console.log(`已经恢复钱包: ${wallet.address}`.green);
        return wallet;
    } catch (error) {
        console.log(`${error.message}`.red);
        process.exit(1);
    }
}

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    console.log(`已经连接到Alchemy节点: ${provider.connection.url}`);

    const wallet = await restoreKey();
    const signerWallet = wallet.connect(provider);
    console.log(`已经使用钱包: ${signerWallet.address}连接到sepolia测试网`);
    const abi = await fs.readFile("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
    const binary = await fs.readFile("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
    const contractFactory = new ethers.ContractFactory(abi, binary, signerWallet);
    console.log(`正在部署合约...`);
    const contract = await contractFactory.deploy();
    console.log(`合约部署成功: ${contract.address}`.yellow);
    const receipt = await contract.deployTransaction.wait(1);
    console.log(`合约部署交易的哈希: ${receipt.transactionHash}`);

    const currentFavoriteNumber = await contract.retrieve();
    console.log(`当前的favoriteNumber: ${currentFavoriteNumber}`.blue);
    const tx = await contract.store(13);
    const receipt_1 = await tx.wait(1);
    console.log(`store交易的哈希: ${receipt_1.transactionHash}`);
    const newFavoriteNumber = await contract.retrieve();
    console.log(`新的favoriteNumber: ${newFavoriteNumber}`.green);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }
);

