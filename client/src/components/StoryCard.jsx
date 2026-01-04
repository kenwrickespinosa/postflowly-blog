import React from "react";
import { FaCalendar } from "react-icons/fa";

function StoryCard({ story }) {
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

  return (
    <div className="p-4 md:px-8">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-12">
        {/* Image */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="w-full h-40 md:h-48 bg-neutral-200 rounded">
            img here
          </div>
        </div>

        {/* Content */}
        <div className="order-2 md:order-1 flex flex-col gap-2">
          <p>
            {story.firstname} {story.lastname}
          </p>

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
