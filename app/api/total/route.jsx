import { ethers } from "ethers"
import { NextResponse } from "next/server"
import connectBlockchain from "../../../components/aftelogin/utils/connectBlockchain"

export async function GET() {
  try {
    const { contract } = connectBlockchain()

    const total = await contract.totalCollected()
    return NextResponse.json(
      { total: ethers.formatEther(total.toString()) },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Something went wrong." }
    )
  }
}
