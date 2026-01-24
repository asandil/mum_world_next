"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortings } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IoFilter } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Search from "./Search";

const Sorting = ({
  limit,
  setLimit,
  sorting,
  setSorting,
  mobileFilterOpen,
  setMobileFilterOpen,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 bg-gray-50">
      <div className="flex justify-between w-full gap-4 lg:hidden">
        <Button
          type="button"
          className="lg:hidden"
          variant="outline"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        >
          <IoFilter />
          Filter
        </Button>
        <Search isShow={showSearch} />
      </div>
      <div className="flex justify-between gap-2 sm:gap-4">
        <ul className="flex items-center gap-2 sm:gap-4">
          <li className="font-semibold">Show</li>
          {[9, 12, 24, 48].map((limitNumber) => (
            <li key={limitNumber}>
              <button
                type="button"
                onClick={() => setLimit(limitNumber)}
                className={`${
                  limitNumber === limit
                    ? "w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center rounded-full bg-primary text-white text-sm"
                    : "cursor-pointer"
                }`}
              >
                {limitNumber}
              </button>
            </li>
          ))}
        </ul>

        <Select value={sorting} onValueChange={(value) => setSorting(value)}>
          <SelectTrigger className="md:w-[180px] w-48 bg-white ">
            <SelectValue placeholder="Default Sorting" />
          </SelectTrigger>
          <SelectContent>
            {sortings.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="lg:block hidden w-full">
      <Search isShow={showSearch}/>
      </div>
    </div>
  );
};

export default Sorting;
