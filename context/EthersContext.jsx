
"use client"

import Cookie from "js-cookie"
import { ethers } from "ethers"
import { toast } from "react-toastify"
import { createContext, useContext, useEffect, useState } from "react"

import SmartContract from "../smatcontracts/artifacts/contracts/CrowdFunding.sol/CrowdFunding.json"

const EthersContext = createContext()

export const EthersProvider = ({ children }) => {
  const [signer, setSigner] = useState(null)
  const [loading, setLoading] = useState(null)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  useEffect(() => {
    const initEthers = async () => {
      const provider = new ethers.JsonRpcProvider(
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
      const connectedProvider = new ethers.WebSocketProvider(window.ethereum)
      const signer = connectedProvider.getSigner()
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
