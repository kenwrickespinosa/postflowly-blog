import React, { useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FaBookmark } from "react-icons/fa";

function StoryCard({ story, showFavorite = false }) {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(story.is_favorite);

  // Format date to string
  const formatDate = () => {
    if (!story.created_at) return "";

    const date = new Date(story.created_at); // keep full timestamp

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-PH", options);
  };

  const handleFavorite = async (e) => {
    try {
      e.stopPropagation();
      const token = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/api/favorite/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          story_id: story.id,
        }),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to fetch favorites stories");

      setIsFavorite(true);
    } catch (err) {
      console.error(err);
    }
  };

  const openStory = () => {
    navigate(`/read-story/${story.id}`);
  };

  return (
    <div onClick={openStory} className="p-4 cursor-pointer md:px-8">
      <div className="mb-4 md:mb-6">
        <p className="font-inter text-neutral-600 text-sm">
          {story.user?.firstname} {story.user?.lastname}
        </p>
        <p className="font-inter text-neutral-600 text-xs">
          {story.user?.email}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-12">
        {/* Image */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="w-full h-40 md:h-48 bg-neutral-200 rounded">
            <img src={story.cover_image} className="h-full w-full" />
          </div>
        </div>

        {/* Content */}
        <div className="order-2 md:order-1 flex flex-col gap-2">
          <p className="font-inter text-lg md:text-2xl">{story.title}</p>

          <p
            className="font-inter text-sm text-neutral-600 
                      line-clamp-3 md:line-clamp-4 md:text-base"
          >
            {story.excerpt}
          </p>

          <div className="flex gap-1 mt-4">
            <FaCalendar className="text-xs text-neutral-600" />
            <p className="font-inter text-xs text-neutral-600">
              {formatDate()}
            </p>
          </div>

          <div className="flex justify-end md:justify-start">
            {showFavorite && (
              <Button
                onClick={handleFavorite}
                disabled={isFavorite}
                className="bg-green-800 hover:bg-green-900 cursor-pointer"
              >
                <FaBookmark className={isFavorite ? "text-yellow-500" : "text-white"} />
                {isFavorite ? "Saved to favorite" : "Add to favorite"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;
