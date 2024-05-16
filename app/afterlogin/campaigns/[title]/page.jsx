"use client";

import Image from "next/image";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEthereum } from "react-icons/fa";

import getDaysLeft from "../../../../utils/getDaysLeft";
import Logo from "../../../../public/Logo.png";
import {
  ClientButton,
  FormInput,
} from "../../../../components/afterlogin/index";
import { useEthersContext } from "../../../../context/EthersContext";

const CampaignDetails = () => {
  const router = useRouter();
  const { selectedCampaign: campaign, contract } = useEthersContext();
  const [amount, setAmount] = useState(0);
  const [topDonations, setTopDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign === null) return router.back();

    campaign.donations.sort((a, b) => b.amount - a.amount);
    const tops = campaign.donations.slice(0, 10);
    setTopDonations(tops);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount === 0) return toast.error("Please enter an amount");
    if (getDaysLeft(campaign.deadline) <= 0)
      return toast.error("Campaign has ended");

    setLoading(true);

    try {
      await contract.donate(campaign.id, {
        value: ethers.parseEther(amount),
        gasLimit: 1000000,
      });

      toast.success("Donation Successful!");
    } catch (error) {
      toast.error("Donation Failed!");
    }

    setAmount(0);
    setLoading(false);
  };

  return (
    <main>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:max-h-none h-full max-h-[300px] w-full md:h-[400px] xl:h-[500px]">
          <img
            className="md:max-h-none h-full max-h-[300px] w-full rounded-lg object-cover"
            src={campaign?.imageUrl}
            alt={campaign?.title}
            width={1400}
            height={800}
          />
        </div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row md:flex-col">
          <div className="bg-neutral-800 w-full min-w-[124px] rounded-lg">
            <p className="p-4 text-center text-2xl">
              {getDaysLeft(campaign?.deadline) > 0
                ? getDaysLeft(campaign?.deadline)
                : "Ended"}
            </p>
            <p className="bg-neutral-700 text-neutral-400 w-full rounded-b-lg p-2 text-center text-sm">
              {getDaysLeft(campaign?.deadline) > 0 ? "Days Left" : "Status"}
            </p>
          </div>
          <div className="bg-neutral-800 w-full min-w-[124px] rounded-lg">
            <p className="p-4 text-center text-2xl">
              {campaign?.collectedAmount ?? 0}
            </p>
            <p className="bg-neutral-700 text-neutral-400 w-full rounded-b-lg p-2 text-center text-sm">
              Raised of {campaign?.target}
            </p>
          </div>
          <div className="bg-neutral-800 w-full min-w-[124px] rounded-lg">
            <p className="p-4 text-center text-2xl">
              {campaign?.donations?.length ?? 0}
            </p>
            <p className="bg-neutral-700 text-neutral-400 w-full rounded-b-lg p-2 text-center text-sm">
              Donations
            </p>
          </div>
        </div>
      </div>
      <div
        className={`grid gap-4 ${
          getDaysLeft(campaign?.deadline) > 0
            ? "grid-cols-1 md:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        <div className="col-span-4 md:col-span-3">
          <div className="mt-8">
            <h4 className="mb-2 text-xl font-semibold uppercase">Creator</h4>
            <div className="flex items-center gap-2">
              <Image
                className="bg-neutral-800 rounded-full p-3"
                src={Logo}
                alt={campaign?.owner}
                width={48}
                height={48}
              />
              <p className="text-neutral-400 truncate">{campaign?.owner}</p>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="mb-2 text-xl font-semibold uppercase">Story</h4>
            <p className="text-neutral-400">{campaign?.description}</p>
          </div>
          <div className="mt-8">
            <h4 className="mb-2 text-xl font-semibold uppercase">
              Top Donations
            </h4>
            <div className="flex flex-col gap-4">
              {topDonations?.length > 0 ? (
                topDonations.map((donation, index) => (
                  <div key={index} className="bg-neutral-800 rounded-lg p-4">
                    <p className="text-neutral-400 flex items-center gap-2">
                      <FaEthereum className="text-emerald-500 text-2xl" />{" "}
                      <b>
                        {donation.amount}{" "}
                        <span className="hidden md:inline">Eth</span>
                      </b>{" "}
                      from <span className="truncate">{donation.donator}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-neutral-400">No donations yet.</p>
              )}
            </div>
          </div>
        </div>
        {getDaysLeft(campaign?.deadline) > 0 && (
          <div className="col-span-4 mt-8 md:col-span-1">
            <h4 className="text-xl font-semibold uppercase">Fund</h4>
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-800 rounded-lg p-4"
            >
              <FormInput
                label={"Amount"}
                placeholder={"ETH 0.1"}
                type={"number"}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="bg-neutral-900 my-4 rounded-lg p-2 text-sm">
                <p>Back it because you believe in it.</p>
                <p className="text-neutral-500 mt-2 text-sm">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>
              <ClientButton
                type="submit"
                onClick={handleSubmit}
                className="bg-emerald-500 hover:bg-emerald-600 duration-200F w-full rounded-lg p-2 font-semibold transition-all"
                loading={loading}
              >
                Fund Campaign
              </ClientButton>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default CampaignDetails;
