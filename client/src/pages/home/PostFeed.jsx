import StoryCard from "@/components/StoryCard";
import React, { useEffect, useState } from "react";

function PostFeed({ stories }) {
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
