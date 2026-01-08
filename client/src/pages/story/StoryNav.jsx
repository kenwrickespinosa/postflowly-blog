import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function StoryNav() {
  return (
    <div className="flex flex-col md:gap-28 md:mt-20">
      <nav className="flex justify-center gap-4 md:gap-10">
        <NavLink
          to="write-story"
          end={false}
          className={({ isActive }) =>
            `${
              isActive
                ? "border-b-2 border-green-400 font-bold text-green-400"
                : "text-inherit"
            } pb-2 md:pb-4 md:text-2xl`
          }
        >
          Write Story
        </NavLink>
        <NavLink
          to="published-stories"
          end={false}
          className={({ isActive }) =>
            `${
              isActive
                ? "border-b-2 border-green-400 font-bold text-green-400"
                : "text-inherit"
            } pb-2 md:pb-4 md:text-2xl`
          }
        >
          Published Story
        </NavLink>
        <NavLink>Favorite Story</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default StoryNav;
