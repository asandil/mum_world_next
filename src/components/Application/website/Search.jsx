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
      className="w-[50%] max-w-auto"
    >
       <form onSubmit={handleSubmit} className="flex justify-between items-center relative">
        <Input
          className="rounded-full h-8 ps-5 border-primary"
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
