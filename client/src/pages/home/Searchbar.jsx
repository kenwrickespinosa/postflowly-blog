import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { IoSearch } from "react-icons/io5";

function Searchbar({ searchQuery, onSearch }) {
  return (
    <div>
      <div className="flex gap-4">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-56.25"
        />
        <Button>
          <IoSearch />
        </Button>
      </div>
    </div>
  );
}

export default Searchbar;
