"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ethers } from "ethers"
import { FiLogOut } from "react-icons/fi"
import Logo from "../../../public/Logo.png"
import { navLinks } from "../utils/constants"
import { ClientButton, Navlink } from "../index"
import { useEthersContext } from "../contexts/EthersContext"

const Sidebar = () => {
  const router = useRouter()
  const { signer, disconnectWallet } = useEthersContext()

  const handleDisconnect = () => {
    disconnectWallet()
    router.push("/")
  }

  return (
    <aside className="sticky left-2 top-2 hidden h-full flex-col bg-black md:flex">
      <Link
        href="/afterlogin"
        className="bg-neutral-800 mb-4 flex items-center justify-center rounded-lg p-2"
      >
        <Image src={Logo} alt="dcfund" priority width={40} height={40} />
      </Link>
      <div className="bg-neutral-800 flex min-h-[calc(100vh-96px)] flex-col rounded-lg p-2">
        <div className="flex flex-col gap-10">
          {navLinks.map((link, index) =>
            signer || index < navLinks.length - 1 ? (
              <Navlink
                key={index}
                Icon={link.Icon}
                href={link.href}
                title={link.title}
                setToggleDrawer={() => {}}
              />
            ) : null
          )}
        </div>
        {signer && (
          <div className="mt-auto">
            <ClientButton
              onClick={handleDisconnect}
              className="hover:bg-neutral-700 text-neutral-400 flex items-center justify-center rounded-lg p-2 transition-all duration-200"
            >
              <FiLogOut className="text-4xl" />
            </ClientButton>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
