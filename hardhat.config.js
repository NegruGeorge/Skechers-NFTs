require("@nomiclabs/hardhat-waffle");
const { mnemonic } = require('./.secrets.json');
require("solidity-coverage");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


 module.exports = {
  solidity: {
      compilers: [{
          version: "0.8.9",
          settings: {
              optimizer: {
                  enabled: true,
                  runs: 200
              }
          }
      }]
  },
  networks: {
      hardhat: {
          gas: 19000000,
          allowUnlimitedContractSize: true,
          timeout: 1800000,
          accounts: { mnemonic: mnemonic }
      },
      mainnet: {
          url: "https://polygon-mainnet.g.alchemy.com/v2/qthz4_6kfuPquCG5N1A6v5Waz9YW0pNZ",
          chainId: 137,
          gasPrice: "auto",
          accounts: { mnemonic: mnemonic }
      },
      rinkeby: {
          url: "https://rinkeby.infura.io/v3/c3bf17f85f294d4ca2c90febc415ee52",
          chainId: 4,
          accounts: { mnemonic: mnemonic },
      },
      mumbai: {
          url: "https://matic-mumbai.chainstacklabs.com/",
          chainId: 80001,
          gasPrice: "auto",
          accounts: { mnemonic: mnemonic }
      }
  }
}
