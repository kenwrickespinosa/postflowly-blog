import React from "react";
import Nav from "./Nav";
import Hero from "./Hero";

function index() {
  return (
    <div className="w-full">
      <div className="relative">
        <Nav />
        <Hero />
      </div>
    </div>
  );
}

export default index;
