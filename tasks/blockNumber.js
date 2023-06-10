const { task } = require("hardhat/config");
require("colors");


task("blockNumber", "Prints the current block number")
    .setAction(
        async (taskArgs, hre) => {
            const blockNumber = await hre.ethers.provider.getBlockNumber();
            console.log("Current block number: ".bgBlue, blockNumber);
        }
    );

