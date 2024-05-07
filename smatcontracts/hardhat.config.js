require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
const { PROJECT_ID, ACCOUNT_PRIVATE_KEY } = process.env
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/PlYFXvnPBEJJD1q7oWJWVb26bBDFlouo`,
      accounts: [
        "0x" +
          "7006b5af0c33ab3d9e31a9e7f79dc8e30d10ac40713060e2ebeb809cd8ade523",
      ],
    },
  },
}
