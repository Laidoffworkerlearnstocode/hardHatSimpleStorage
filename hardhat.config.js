require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomicfoundation/hardhat-verify");
require("hardhat-gas-reporter");

require("./tasks/blockNumber");


task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, hre) => {
    const balance = await hre.ethers.provider.getBalance(taskArgs.account);
    const ethBalance = hre.ethers.formatEther(balance);
    console.log(ethBalance);
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts默认使用hardhat列表中的第一个账户
      chainId: 31337,
    }
  },
  solidity: "0.8.18",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  // gasReporter: {
  //   enabled: true,
  // }
};
