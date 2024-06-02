import React from "react";
import Image from "next/image";

import Logo from "@/public/Logo.png";

const Loading = () => {
  return (
    <div className="z-10 flex bg-[#081232] h-[90%] w-full items-center justify-center">
      <div className="flex animate-pulse flex-col items-center gap-2">
        <Image src={Logo} alt="dcfund" width={112} height={112} />
        <p className="text-emerald-500 mt-2 text-center text-2xl font-bold">
          Loading..
        </p>
      </div>
    </div>
  );
};

export default Loading;
