"use client"
import { EthersProvider } from "./contexts/EthersContext"

const Providers = ({ children }) => {
  return <EthersProvider>{children}</EthersProvider>
}

export default Providers
