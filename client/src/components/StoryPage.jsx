import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoryContent from "./editor/StoryContent";
import { Spinner } from "./ui/spinner";

function StoryPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const formatDate = () => {
    if (!story.created_at) return "No date";

    const date = new Date(story.created_at); // keep full timestamp

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-PH", options);
  };

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://127.0.0.1:8000/api/read-story/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch story");

        setStory(data.story);
        setCoverImage(data.cover_image);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStory();
  }, [id]);

  if (!story)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Spinner className="size-6" />
          <p>Please Wait</p>
        </div>
      </div>
    );

  return (
    <div className="w-full">
      <p className="font-inter font-bold text-3xl text-center text-green-600 md:text-5xl md:mt-12 md:mb-24">
        Postflowly
      </p>
      {/* Main */}
      <div className="flex flex-col gap-10 mx-10 my-12 md:mx-60">
        {/* Story and writer details */}
        <div className="flex flex-col items-center">
          <p className="font-inter text-center font-semibold text-2xl/6 mb-2 md:text-4xl/8 tracking-wide md:tracking-wider">
            {story.title}
          </p>
          <p className="font-inter text-base md:text-xl">
            written by {story.user.firstname} {story.user.lastname}
          </p>
          <p className="font-inter font-light text-neutral-400 text-xs md:text-base">
            {story.user.email}
          </p>
          <p className="font-inter font-light text-neutral-400 text-xs md:text-base">
            {formatDate()}
          </p>
        </div>
        <div
          className={
            coverImage &&
            coverImage !== "null" &&
            coverImage !== "" &&
            coverImage !== "http://127.0.0.1:8000/storage"
              ? ""
              : "hidden"
          }
        >
          <img src={coverImage} />
        </div>
        <div>
          <p className="font-merriweather text-sm/6 tracking-wider md:text-lg/8 md:tracking-widest">
            {story.excerpt}
          </p>
        </div>
        <div>
          <StoryContent
            content={story.content}
            fontType="font-merriweather"
            textSizeSm="text-sm/6"
            textSizeMd="text-lg/8"
            textTrackingSm="tracking-wider"
            textTrackingMd="tracking-widest"
          />
        </div>
      </div>
    </div>
  );
}

export default StoryPage;
