import React from "react";

function Footer() {
  return (
    <div className="absolute w-full bg-green-700 h-14">
      <div className="flex flex-row justify-between px-4 py-3 md:px-36 md:py-4">
        <p className="font-inter text-xs text-white md:text-base">&copy; 2026 Postflowly</p>
        <p className="font-inter text-xs text-white md:text-base">
          Credits: Illustration by{" "}
          <a href="https://undraw.co/" target="_blank" className="underline">
            UnDraw
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
