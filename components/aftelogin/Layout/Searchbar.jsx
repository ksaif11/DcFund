import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useRouter } from "next/navigation"

const Searchbar = () => {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.length === 0) return

    router.push(`/afterlogin/search?q=${search}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center font-semibold sm:max-w-[280px] md:max-w-[400px]"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="bg-neutral-800 placeholder:text-neutral-500 w-full rounded-l-lg p-3 outline-none"
        placeholder="Search for campaign..."
      />
      <button
        onClick={handleSubmit}
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-600 border-emerald-500 -ml-2 rounded-lg border-2 px-4 py-3 transition-all duration-200"
      >
        <FaSearch className="text-xl" />
      </button>
    </form>
  )
}

export default Searchbar
