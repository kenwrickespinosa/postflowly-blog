import React from "react";
import { FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function StoryCard({ story }) {
  const navigate = useNavigate();

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
        </div>
      </div>
    </div>
  );
}

export default StoryCard;
