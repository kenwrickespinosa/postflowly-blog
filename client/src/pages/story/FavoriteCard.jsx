import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function FavoriteCard({ favorite, onRemove }) {
  const navigate = useNavigate();

  const handleRemove = async (e) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://127.0.0.1:8000/api/favorite/destroy/${favorite.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to remove story as favorite");

      onRemove(favorite.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNavigate = () => {
    navigate(`/read-story/${favorite.story_id}`);
  };

  return (
    <Card onClick={handleNavigate} className="cursor-pointer bg-neutral-50">
      <CardHeader>
        <CardTitle className="font-inter text-lg md:text-2xl">
          {favorite.story.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Cover image */}
          <div>
            <img
              src={favorite.story.cover_image_url}
              className="h-full w-full"
            />
          </div>

          {/* Excerpt */}
          <div>
            <p className="font-inter text-sm text-neutral-600 line-clamp-3 md:line-clamp-4 md:text-base">
              {favorite.story.excerpt}
            </p>
          </div>

          {/* Details */}
          <div className="flex justify-between">
            <div>
              <p className="font-inter font-semibold text-neutral-600 text-sm">
                {favorite.story.user.firstname} {favorite.story.user.lastname}
              </p>
              <p className="font-inter text-neutral-600 text-sm">
                {favorite.story.user.email}
              </p>
            </div>
            <div>
              <Button onClick={handleRemove} className="bg-inherit cursor-pointer hover:bg-inherit">
                <FaBookmark className="text-yellow-300 size-8" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FavoriteCard;
