import Image from "next/image";

import Card from "@/components/afterlogin/Card";
import Logo from "@/public/Logo.png";

const fetchCampaigns = async () => {
  const res = await fetch(`http://localhost:3000/api/campaigns`, {
    method: "GET",
    cache: "no-cache",
  });

  const data = await res.json();
  var campaigns = data.campaigns;

  if (!campaigns) campaigns = [];

  campaigns.sort((a, b) => b.collectedAmount - a.collectedAmount);

  const tops = campaigns.slice(0, 9);
  const donationCount = campaigns.reduce(
    (total, campaign) => total + campaign.donations.length,
    0,
  );

  return { campaigns: tops, donationCount, campaignCount: campaigns.length };
};

const fetchTotalCollected = async () => {
  const res = await fetch(`http://localhost:3000/api/total`, {
    method: "GET",
    cache: "no-cache",
  });
  const data = await res.json();
  return data.total || 0;
};

const Home = async () => {
  const totalCollected = await fetchTotalCollected();
  const { campaigns, campaignCount, donationCount } = await fetchCampaigns();

  return (
    <div>
      <div className="mt-28 w-full rounded-lg bg-black p-8 md:p-8">
        <div className="flex">
          <div>
            <div className="gap-15 flex items-end">
              <Image
                className="hidden md:block"
                src={Logo}
                alt="dcfund"
                width={50}
                height={50}
              />
              <h1 className="text-2xl font-semibold md:text-4xl">
                Welcome to DC Fund
              </h1>
            </div>
            <p className="text-neutral-400 mb-8 mt-4 text-sm md:text-lg">
              DC Fund is a decentralized crowdfunding platform built on
              Ethereum. It allows anyone to create a campaign and raise funds.
              What we have achieved so far:
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="bg-neutral-700 w-full rounded-lg p-4">
            <h5 className="mb-2 text-center">All Campaigns</h5>
            <p className="text-center text-2xl font-semibold">
              {campaignCount}
            </p>
          </div>
          <div className="bg-neutral-700 w-full rounded-lg p-4">
            <h5 className="mb-2 text-center">Total Donations</h5>
            <p className="text-center text-2xl font-semibold">
              {donationCount}
            </p>
          </div>
          <div className="bg-neutral-700 w-full rounded-lg p-4">
            <h5 className="mb-2 text-center">Collected Eth</h5>
            <p className="text-center text-2xl font-semibold">
              {totalCollected}
            </p>
          </div>
        </div>
      </div>
      <h1 className="mb-4 text-xl">Most Popular Campaigns</h1>
      {campaigns?.length === 0 ? (
        <div className="mt-10 flex  flex-col justify-center gap-4">
          <h1 className="text-4xl font-semibold">No Campaigns Found</h1>
          <p className="text-neutral-400 text-lg">
            It looks like there are no campaigns created yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {campaigns?.map((campaign) => (
            <Card campaign={campaign} key={campaign.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
