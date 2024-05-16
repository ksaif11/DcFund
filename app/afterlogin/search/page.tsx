import React from "react";
import { Card } from "@/components/afterlogin/index";

interface SearchPageProps {
  searchParams: { q: string }; // Define the type for searchParams
  user: any; // Update this to the correct type (e.g., UserType)
}

const findCampaigns = async (query: string) => {
  if (!query) return null;

  const words = query.split(" ");

  const res = await fetch(`http://localhost:3000/api/campaigns`, {
    method: "GET",
    cache: "no-cache",
  });
  const data = await res.json();
  const campaigns = data.campaigns || [];

  const priorityCampaigns = campaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(query.toLowerCase()) ||
      campaign.description.toLowerCase().includes(query.toLowerCase()),
  );

  const otherCampaigns = campaigns.filter((campaign) =>
    words.some(
      (word) =>
        campaign.title.toLowerCase().includes(word.toLowerCase()) ||
        campaign.description.toLowerCase().includes(word.toLowerCase()),
    ),
  );

  return [...priorityCampaigns, ...otherCampaigns];
};

const SearchPage: React.FC<SearchPageProps> = ({ searchParams, user }) => {
  const fetchCampaigns = async () => {
    const campaigns = await findCampaigns(searchParams.q);

    if (!campaigns) {
      return (
        <div>
          <p className="text-neutral-400 text-lg mt-10">
            Please search for the campaigns you want in the search box above.
          </p>
        </div>
      );
    }

    return (
      <div>
        <h1 className="mb-4 text-xl"> Campaigns Found ({campaigns.length})</h1>
        {campaigns.length === 0 ? (
          <div className="mt-10 flex flex-col justify-center gap-4">
            <h1 className="text-4xl font-semibold">No Campaigns Found</h1>
            <p className="text-neutral-400 text-lg">
              It looks like there are no campaigns found. Try searching for
              another term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card campaign={campaign} user={user} key={campaign.id} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return fetchCampaigns();
};

export default SearchPage;
