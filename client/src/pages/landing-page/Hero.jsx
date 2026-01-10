import React from "react";
import Undraw from "../../assets/illustrations/undraw_blogging_38kl.svg?react";
import { Button } from "@/components/ui/button";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/auth/signup");
  };

  return (
    <div className="w-full h-screen absolute overflow-hidden">
      <div className="h-min pt-32 flex flex-col items-center mx-6 md:mx-36 md:pt-52 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <p
            className="font-merriweather font-bold text-neutral-700 text-2xl tracking-wide text-center 
                mb-2 md:w-200 md:text-left md:text-6xl md:mb-4"
          >
            A modern space for meaningful conversation.
          </p>
          <p className="font-inter text-xs text-center tracking-wider mb-6 md:text-base md:text-left">
            Share your thoughts, explore perspective, and connect through
            meaningful writing.
          </p>
          <Button
            onClick={handleNavigate}
            className="w-50 border-green-700 bg-green-700 hover:bg-green-900 cursor-pointer md:text-lg md:py-6"
          >
            Let's Read & Write
          </Button>
        </div>
        <div>
          <Undraw className="size-85 md:size-max" />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Hero;
