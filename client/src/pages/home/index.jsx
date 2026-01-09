import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import PostFeed from "./PostFeed";
import { useSearchParams } from "react-router-dom";

function index() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(""); // Search query
  const [stories, setStories] = useState([]);

  const handleFetch = async (query = "") => {
    setSearchParams(query ? { search: query } : {});
  };

  useEffect(() => {
    const fetchStories = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/story/index?${searchParams.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch stories");

        setStories(data.stories || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStories();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center px-2 my-12">
      <div>
        <Searchbar search={search} onSearch={setSearch} onFetch={handleFetch} />
      </div>
      <div>
        <PostFeed stories={stories} />
      </div>
    </div>
  );
}

export default index;
