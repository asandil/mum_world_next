"use client";
import { Input } from "@/components/ui/input";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";


const Search = ({ isShow }) => {
  const router = useRouter()
  const [query, setQuery] = useState()
  // const handleSearch = () => {
  //   router.push(`${WEBSITE_SHOP}?q=${query}`)
  // }

    const handleSubmit = (e) => {
    e.preventDefault()
    if (query) {
      router.push(`${WEBSITE_SHOP}?q=${query}`)
    }
    setQuery('')
  }

  return (
    <div
      className={`absolute border-t transition-all left-0 py-5 md:px-32 px-5 z-10 bg-white/80 w-full ${isShow ? "lg:top-22 top-12 " : "-top-full "
        }`}
    >
       <form onSubmit={handleSubmit} className="flex justify-between items-center relative">
        <Input
          className="rounded-full md:h-12 ps-5 border-primary"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          value={query || ''}
        />
        <button type="submit" className="absolute right-3 cursor-pointer">
          <IoSearchOutline size={20} className="text-gray-500" />
        </button>
        </form>
    </div>
  );
};

export default Search;
