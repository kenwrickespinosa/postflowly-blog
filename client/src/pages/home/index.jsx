import React, { useState } from "react";
import Searchbar from "./Searchbar";
import PostFeed from "./PostFeed";

function index() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  return (
    <div className="flex flex-col items-center px-2">
      <div>
        <Searchbar searchQuery={searchQuery} onSearch={setSearchQuery} />
      </div>
      <div>
        <PostFeed />
      </div>
    </div>
  );
}

export default index;
