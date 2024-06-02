"use client";
import Link from "next/link";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { RiMenuFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

import Searchbar from "./Searchbar";
import Logo from "@/public/Logo.png";
import { navLinks } from "@/utils/constants";
import ClientButton from "@/components/afterlogin/ui/ClientButton";
import Navlink from "@/components/afterlogin/ui/Navlink";
import { useEthersContext } from "@/context/EthersContext";

const Topbar = () => {
  const router = useRouter();
  const drawerRef = useRef(null);
  const { signer, loading, connectWallet, disconnectWallet } =
    useEthersContext();
  const [toggleDrawer, setToggleDrawer] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target))
        setToggleDrawer(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef]);

  return (
    <div className="sticky top-20  flex w-full flex-col-reverse items-center justify-between  bg-[#13131a] pb-4 sm:flex-row md:relative md:bg-transparent md:pb-0">
      <Link href="/" className="hidden rounded-lg p-2 sm:block md:hidden">
        <Image src={Logo} alt="dcfund" priority width={40} height={40} />
      </Link>

      <Searchbar />

      {/* LARGE SCREEN */}
      <div className="hidden md:block">
        {signer ? (
          <div className="flex items-center ">
            <ClientButton
              onClick={() => router.push("/afterlogin/create")}
              loading={loading}
              className="bg-emerald-500 hover:bg-emerald-600  rounded-lg p-3 font-semibold transition-all duration-200"
            >
              Create Campaign
            </ClientButton>
            <Link href="/account" className="bg-neutral-800 rounded-full p-3">
              <Image src={Logo} alt="user" width={24} height={24} />
            </Link>
          </div>
        ) : (
          <ClientButton
            onClick={connectWallet}
            loading={loading}
            className="bg-emerald-500 hover:bg-emerald-600 rounded-lg p-3 font-semibold transition-all duration-200"
          >
            Connect
          </ClientButton>
        )}
      </div>

      {/* SMALL SCREEN */}
      <div className="relative mb-3 flex w-full items-center justify-between sm:mb-0 sm:w-auto sm:justify-end md:hidden">
        <Link href="/" className="rounded-lg p-2 sm:hidden">
          <Image src={Logo} alt="dcfund" priority width={40} height={40} />
        </Link>

        <ClientButton
          className=""
          onClick={() => setToggleDrawer((prev) => !prev)}
        >
          <RiMenuFill className="text-neutral-500 text-5xl" />
        </ClientButton>

        <div
          ref={drawerRef}
          className={`
            bg-neutral-800 absolute right-0 top-16 z-50 ml-4 flex w-[calc(100vw-32px)] flex-col gap-2 rounded-lg p-2 transition-all duration-700 sm:w-[50vw] 
            ${!toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"}
          `}
        >
          {signer ? (
            <ClientButton
              loading={loading}
              onClick={() => router.push("/afterlogin/create")}
              className="bg-emerald-500 hover:bg-emerald-600 flex w-full justify-center rounded-lg p-3 font-semibold transition-all duration-200"
            >
              Create Campaign
            </ClientButton>
          ) : (
            <ClientButton
              loading={loading}
              onClick={connectWallet}
              className="bg-emerald-500 hover:bg-emerald-600 w-full rounded-lg p-3 font-semibold transition-all duration-200"
            >
              Connect
            </ClientButton>
          )}
          {navLinks.map((link, index) =>
            signer || index < navLinks.length - 1 ? (
              <Navlink
                key={index}
                Icon={link.Icon}
                href={link.href}
                title={link.title}
                setToggleDrawer={setToggleDrawer}
              />
            ) : null,
          )}
          {signer && (
            <ClientButton
              onClick={disconnectWallet}
              className="hover:bg-neutral-700 text-neutral-400 flex items-center justify-start gap-3 rounded-lg p-2 transition-all duration-200"
            >
              <FiLogOut className="text-4xl" />
              <p className="font-semibold">Logout</p>
            </ClientButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
