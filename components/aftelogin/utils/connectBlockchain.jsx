import { ethers } from "ethers"
import SmartContract from "../../../smatcontracts/artifacts/contracts/CrowdFunding.sol/CrowdFunding.json"

export default () => {
  const provider = new ethers.JsonRpcProvider(
    //alchemy website http api link
    "https://eth-sepolia.g.alchemy.com/v2/PlYFXvnPBEJJD1q7oWJWVb26bBDFlouo"
  )
  const signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY ||
      "7006b5af0c33ab3d9e31a9e7f79dc8e30d10ac40713060e2ebeb809cd8ade523",
    provider
  )
  const contract = new ethers.Contract(
    //contract address
    "0x16815fa26a70A3A1bfdc11707f9780783F9FF2aB",
    SmartContract["abi"],
    signer
  )

  return { contract, provider, signer }
}
