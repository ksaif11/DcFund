"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Loading from "../loading";

import { Card } from "@/components/afterlogin/index";
import Logo from "@/public/Logo.png";
import { useEthersContext } from "@/context/EthersContext";

export default function Account() {
  const { signer } = useEthersContext();
  const [campaigns, setCampaigns] = useState(null);
  const [totalCollected, setTotalCollected] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await fetch(
        `http://localhost:3000/api/campaigns?owner=${signer?.address}`,
      );
      const data = await res.json();
      var campaigns = data.campaigns;

      if (!campaigns) campaigns = [];

      const totalCollected = campaigns.reduce(
        (acc, campaign) => acc + Number(campaign.collectedAmount),
        0,
      );
      const totalWithdrawn = campaigns.reduce(
        (acc, campaign) => acc + Number(campaign.withdrawedAmount),
        0,
      );

      setCampaigns(campaigns);
      setTotalCollected(totalCollected);
      setTotalWithdrawn(totalWithdrawn);
    };

    signer?.address && fetchCampaigns();
  }, [signer?.address]);

  if (!signer?.address || campaigns === null) {
    return (
      <div className="z-10 flex h-[90%] w-full items-center justify-center">
        <div className="flex animate-pulse flex-col items-center gap-2">
          <Image src={Logo} alt="dcfund" width={112} height={112} />
          <p className="text-emerald-500 mt-2 text-center text-2xl font-bold">
            Loading..
          </p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="bg-neutral-800 w-full rounded-lg p-4">
        <h1 className="text-2xl font-semibold">Account</h1>
        <div className="my-4 flex flex-col">
          <span className="text-neutral-400">Address:</span>
          <span className="text-neutral-300 truncate">{signer?.address}</span>
        </div>
        <div className="grid grid-cols-1 items-center justify-between gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400">Number of Campaigns:</span>
            <span className="text-neutral-300">{campaigns?.length ?? 0}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400">Total Collected:</span>
            <span className="text-neutral-300">{totalCollected}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400">Total Withdrawn:</span>
            <span className="text-neutral-300">{totalWithdrawn}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {campaigns?.length === 0 ? (
          <div className="mt-10 flex flex-col justify-center gap-4">
            <h1 className="text-xl">No Campaigns Found</h1>
            <p className="text-neutral-400 text-lg">
              Newly created campaigns may not appear immediately.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 mt-8">
              <h1 className="text-xl">
                Your Campaigns ({campaigns?.length ?? 0})
              </h1>
              <p className="text-neutral-400 text-lg">
                Newly created campaigns may not appear immediately.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {campaigns?.map((campaign) => (
                <Card
                  campaign={campaign}
                  key={campaign.id}
                  user={signer?.address}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// export default function Account() {
//   return (
//     <Suspense fallback={<Loading />}>
//       <Acnt />
//     </Suspense>
//   );
// }
