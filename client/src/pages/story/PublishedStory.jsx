import StoryCard from "@/components/StoryCard";
import { Spinner } from "@/components/ui/spinner";
import React, { useEffect, useState } from "react";

function PublishedStory() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://127.0.0.1:8000/api/story/my-published-stories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch stories");
        }

        setStories(data.story || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center my-10 md:my-0">
        <Spinner className="size-5 md:size-6" />
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="flex flex-col items-center my-10 md:my-0">
        <p>No published stories</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {Array.isArray(stories) &&
        stories.map((story) => (
          <div
            key={story.id}
            className="mb-6 bg-neutral-50 rounded-lg w-75 md:w-178.75"
          >
            <StoryCard story={story} />
          </div>
        ))}
    </div>
  );
}

export default PublishedStory;
