"use client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Logo from "../../public/Logo.png"
import getDaysLeft from "../../utils/getDaysLeft"
import { useEthersContext } from "../../context/EthersContext"
import { AlertModal, ClientButton, WithdrawModal } from "."

const Card = ({ campaign, user }) => {
  const router = useRouter()
  const { setSelectedCampaign } = useEthersContext()

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)

  const handleClickCard = () => {
    if (isAlertOpen || isWithdrawOpen) return

    setSelectedCampaign(campaign)
    const title = campaign.title.replace(/\s/g, "-").toLowerCase()
    router.push(`/afterlogin/campaigns/${title}`)
  }

  const handleClickButton = (e, type) => {
    e.stopPropagation()

    if (type === "withdraw") setIsWithdrawOpen(true)
    else setIsAlertOpen(true)
  }

  return (
    <div
      onClick={handleClickCard}
      className="bg-neutral-800 w-full cursor-pointer rounded-lg"
    >
      <img
        className="h-[210px] w-full rounded-lg md:h-[200px] xl:h-[264px]"
        loading="lazy"
        src={campaign.imageUrl}
        alt={campaign.title}
        width={500}
        height={250}
      />
      <div className="p-2 sm:p-4">
        <h5 className="truncate py-1 text-xl">{campaign.title}</h5>
        <p className="text-neutral-400 truncate pb-4">{campaign.description}</p>
        <div className="flex justify-between gap-4 pb-4">
          <div className="flex flex-col overflow-hidden">
            <span className="text-neutral-300">{campaign.collectedAmount}</span>
            <span className="text-neutral-400 truncate">
              Raised of {campaign.target}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-neutral-300">
              {getDaysLeft(campaign.deadline) > 0
                ? getDaysLeft(campaign.deadline)
                : "Ended"}
            </span>
            <span className="text-neutral-400">
              {getDaysLeft(campaign.deadline) > 0 ? "Days Left" : "Campaign"}
            </span>
          </div>
        </div>
        {user === campaign.owner && getDaysLeft(campaign.deadline) > 0 ? (
          <div className="mt-2 flex gap-3 font-semibold sm:mt-4">
            <ClientButton
              onClick={(e) => handleClickButton(e, "withdraw")}
              className="bg-emerald-500 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 w-full rounded-lg border-2 p-2 transition-all duration-200"
            >
              Withdraw
            </ClientButton>
            <ClientButton
              onClick={(e) => handleClickButton(e, "end")}
              className="text-emerald-500 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 hover:text-neutral-200 w-full rounded-lg border-2 bg-transparent p-2 transition-all duration-200"
            >
              End
            </ClientButton>
          </div>
        ) : (
          <div className="flex items-center">
            <Image
              className="bg-neutral-900 mr-2 rounded-full p-2"
              src={Logo}
              alt="logo"
              width={36}
              height={36}
            />
            <p className="truncate text-sm">
              <span className="text-neutral-400 mr-1">by</span> {campaign.owner}
            </p>
          </div>
        )}
        {isAlertOpen && (
          <AlertModal setIsOpen={setIsAlertOpen} campaignId={campaign.id} />
        )}
        {isWithdrawOpen && (
          <WithdrawModal
            setIsOpen={setIsWithdrawOpen}
            campaignId={campaign.id}
            totalCollected={campaign.collectedAmount}
            totalWithdrawn={campaign.withdrawedAmount}
          />
        )}
      </div>
    </div>
  )
}

export default Card
