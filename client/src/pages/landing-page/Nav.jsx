import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/auth/login");
  };

  return (
    <div className="w-full absolute z-10">
      <div className="flex justify-between items-center mx-6 h-15 md:mx-36 md:h-25">
        <div>
          <p className="font-merriweather font-bold text-xl md:text-4xl text-green-700">
            Postflowly
          </p>
        </div>
        <div>
          <Button
            onClick={handleNavigate}
            variant="outline"
            className="font-inter text-green-700 cursor-pointer border-green-700 hover:text-green-900
                hover:bg-inherit hover:border-green-900 md:text-2xl md:p-6"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
