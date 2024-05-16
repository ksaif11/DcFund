import { Card } from "@/components/afterlogin/index";

const fetchCampaigns = async (sort) => {
  const res = await fetch(`http://localhost:3000/api/campaigns`, {
    method: "GET",
    cache: "no-cache",
  });
  const data = await res.json();
  var campaigns = data.campaigns;

  if (!campaigns) campaigns = [];

  if (sort === undefined || sort === null) return campaigns;
  else if (sort === "newest") return campaigns.slice(-9).reverse();

  campaigns.sort((a, b) => b.collectedAmount - a.collectedAmount);
  const tops = campaigns.slice(0, 9);
  return tops;
};

const Campaigns = async ({ searchParams }) => {
  const campaigns = await fetchCampaigns(searchParams.sort);

  return (
    <div>
      <h1 className="mb-4 text-xl">
        {!searchParams.sort
          ? `All Campaigns (${campaigns?.length ?? 0})`
          : searchParams.sort === "newest"
            ? `Newest Campaigns (${campaigns?.length ?? 0})`
            : `Top Campaigns (${campaigns?.length ?? 0})`}
      </h1>
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
            //check user prop
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaigns;
