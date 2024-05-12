"use client";
import { EthersProvider } from "@/context/EthersContext";

const Providers = ({ children }) => {
  return <EthersProvider>{children}</EthersProvider>;
};

export default Providers;
