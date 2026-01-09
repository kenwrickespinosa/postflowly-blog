import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { IoSearch } from "react-icons/io5";

function Searchbar({ search, onSearch, onFetch }) {
  return (
    <div>
      <div className="flex gap-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search stories"
          className="w-56.25 font-inter md:h-12 md:text-lg md:w-100"
        />
        <Button onClick={() => onFetch(search)} className="bg-green-700 cursor-pointer md:h-12 md:w-12 hover:bg-green-900">
          <IoSearch />
        </Button>
      </div>
    </div>
  );
}

export default Searchbar;
