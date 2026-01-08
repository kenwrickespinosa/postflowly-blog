import StoryCard from "@/components/StoryCard";
import React, { useEffect, useState } from "react";

function PostFeed() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/api/story/index", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Unable to retrieve stories");

        setStories(data.story || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStories();
  }, []);

  return (
    <div>
      <div className="my-10 md:my-20">
        {stories.map((story) => (
          <div key={story.id} className="mb-6 bg-neutral-50 rounded-lg w-75 md:w-178.75">
            <StoryCard story={story} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostFeed;
