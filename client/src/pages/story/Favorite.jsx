import React, { useEffect, useState } from "react";
import FavoriteCard from "./FavoriteCard";
import { Spinner } from "@/components/ui/spinner";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRemoveFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  useEffect(() => {
    const handleFetch = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://127.0.0.1:8000/api/favorite/index", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch stories");

        setFavorites(data.favorites || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetch();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center my-10 md:my-20">
        <Spinner className="size-5 md:size-6" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return <div className="flex justify-center my-10 md:my-20">No favorite</div>;
  }

  return (
    <div className="h-auto w-full px-10 py-6 md:py-0 md:px-20 flex flex-col md:flex-row gap-8">
      {favorites.map((favorite) => (
        <div key={favorite.id} className="md:w-87.5 md:grid-cols-3">
          <FavoriteCard favorite={favorite} onRemove={handleRemoveFavorite} />
        </div>
      ))}
    </div>
  );
}

export default Favorite;
