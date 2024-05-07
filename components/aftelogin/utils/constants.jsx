import { MdOutlineCampaign } from "react-icons/md"
import { BsGrid } from "react-icons/bs"
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { TbZoomMoney } from "react-icons/tb"
import { HiOutlineUserCircle } from "react-icons/hi"
// Update the navLinks array with relative paths
export const navLinks = [
  {
    Icon: BsGrid,
    href: "/afterlogin/campaigns", // Change to relative path
    title: "All Campaigns",
  },
  {
    Icon: RiMoneyDollarCircleLine,
    href: "/afterlogin/campaigns?sort=most_funded", // Change to relative path
    title: "Most Funded",
  },
  {
    Icon: MdOutlineCampaign,
    href: "/afterlogin/campaigns?sort=newest", // Change to relative path
    title: "New Campaigns",
  },
  {
    Icon: TbZoomMoney,
    href: "/afterlogin/search", // Change to relative path
    title: "Search",
  },
  {
    Icon: HiOutlineUserCircle,
    href: "/afterlogin/account", // Change to relative path
    title: "Account",
  },
]
