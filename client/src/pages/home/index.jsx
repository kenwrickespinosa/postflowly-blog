import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import PostFeed from "./PostFeed";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

function index() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(""); // Search query
  const [stories, setStories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, [searchParams]);

  // if (isLoading) return <div>{isLoading && <Spinner />}</div>;

  return (
    <div className="flex flex-col items-center px-2 my-12">
      <div>
        <Searchbar search={search} onSearch={setSearch} onFetch={handleFetch} />
      </div>
      <div>
        <div className="my-10 md:my-20">
          {isLoading && (<Spinner className="size-5 md:size-6" />)}
        </div>
        <PostFeed stories={stories} />
      </div>
    </div>
  );
}

export default index;
