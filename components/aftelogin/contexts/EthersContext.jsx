// import Cookie from "js-cookie"
// import { ethers } from "ethers"
// import { toast } from "react-toastify"
// import { createContext, useContext, useEffect, useState } from "react"

// // Import your smart contract ABI
// import SmartContract from "../../../smatcontracts/artifacts/contracts/CrowdFunding.sol/CrowdFunding.json"

// // Create a context for Ethereum related functions and data
// const EthersContext = createContext()

// // Ethereum provider component
// export const EthersProvider = ({ children }) => {
//   // State variables to manage Ethereum connection and contract
//   const [signer, setSigner] = useState(null)
//   const [loading, setLoading] = useState(null)
//   const [provider, setProvider] = useState(null)
//   const [contract, setContract] = useState(null)
//   const [selectedCampaign, setSelectedCampaign] = useState(null)

//   // Initialize Ethereum connection and contract
//   useEffect(() => {
//     const initEthers = async () => {
//       // Initialize Ethereum provider
//       const provider = new ethers.provider.JsonRpcProvider(
//         "https://eth-sepolia.g.alchemy.com/v2/PlYFXvnPBEJJD1q7oWJWVb26bBDFlouo"
//       )

//       // Initialize contract instance
//       const contractInstance = new ethers.Contract(
//         "0x16815fa26a70A3A1bfdc11707f9780783F9FF2aB",
//         SmartContract.abi,
//         provider
//       )

//       // Set provider and contract in state
//       setProvider(provider)
//       setContract(contractInstance)

//       // Check if user is allowed and connect wallet if necessary
//       Cookie.get("isAllowed") && connectWallet()
//     }

//     initEthers()
//   }, [])

//   // Function to connect wallet
//   const connectWallet = async () => {
//     setLoading(true)

//     if (window.ethereum !== undefined) {
//       try {
//         // Request user to connect their wallet
//         await window.ethereum.request({ method: "eth_requestAccounts" })

//         // Get signer from connected provider
//         const connectedProvider = new ethers.provider.Web3Provider(
//           window.ethereum
//         )
//         const signer = connectedProvider.getSigner()
//         const contractInstance = new ethers.Contract(
//           "0x16815fa26a70A3A1bfdc11707f9780783F9FF2aB",
//           SmartContract.abi,
//           signer
//         )

//         // Set signer and contract in state
//         setSigner(signer)
//         setContract(contractInstance)

//         // Set cookie to indicate user is allowed
//         Cookie.set("isAllowed", true)
//       } catch (error) {
//         console.error(error)
//         toast.error("Failed to connect wallet.")
//       }
//     } else {
//       toast.error("Please install Metamask to continue.")
//     }

//     setLoading(false)
//   }

//   // Function to disconnect wallet
//   const disconnectWallet = () => {
//     setSigner(null)
//     Cookie.remove("isAllowed")
//   }

//   // Context values to provide to children components
//   const values = {
//     signer,
//     loading,
//     contract,
//     provider,
//     selectedCampaign,
//     connectWallet,
//     disconnectWallet,
//     setSelectedCampaign,
//   }

//   return (
//     <EthersContext.Provider value={values}>{children}</EthersContext.Provider>
//   )
// }

// // Hook to use Ethereum context
// export const useEthersContext = () => useContext(EthersContext)
"use client"

import Cookie from "js-cookie"
import { ethers } from "ethers"
import { toast } from "react-toastify"
import { createContext, useContext, useEffect, useState } from "react"

import SmartContract from "../../../smatcontracts/artifacts/contracts/CrowdFunding.sol/CrowdFunding.json"
// import SmartContract from "../../../smatcontracts/artifacts/contracts/CrowdFunding.sol/CrowdFunding.json"

const EthersContext = createContext()

export const EthersProvider = ({ children }) => {
  const [signer, setSigner] = useState(null)
  const [loading, setLoading] = useState(null)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  useEffect(() => {
    const initEthers = async () => {
      const provider = new ethers.BrowserProvider(
        "https://eth-sepolia.g.alchemy.com/v2/PlYFXvnPBEJJD1q7oWJWVb26bBDFlouo"
      )
      const contractInstance = new ethers.Contract(
        "0x16815fa26a70A3A1bfdc11707f9780783F9FF2aB",
        SmartContract["abi"],
        provider
      )

      setProvider(provider)
      setContract(contractInstance)
      Cookie.get("isAllowed") && connectWallet()
    }

    initEthers()
  }, [])

  const connectWallet = async () => {
    setLoading(true)

    if (window.ethereum !== undefined) {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const connectedProvider = new ethers.BrowserProvider(window.ethereum)
      const signer = await connectedProvider.getSigner()
      const contractInstance = new ethers.Contract(
        "0x16815fa26a70A3A1bfdc11707f9780783F9FF2aB",
        SmartContract["abi"],
        signer
      )

      setSigner(signer)
      setContract(contractInstance)
      Cookie.set("isAllowed", true)
    } else {
      toast.error("Please install Metamask to continue.")
    }

    setLoading(false)
  }

  const disconnectWallet = () => {
    setSigner(null)
    Cookie.remove("isAllowed")
  }

  const values = {
    signer,
    loading,
    contract,
    provider,
    selectedCampaign,
    connectWallet,
    disconnectWallet,
    setSelectedCampaign,
  }

  return (
    <EthersContext.Provider value={values}>{children}</EthersContext.Provider>
  )
}

export const useEthersContext = () => useContext(EthersContext)
