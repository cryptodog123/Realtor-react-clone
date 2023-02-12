import React from "react";
import { useLocation } from "react-router";

const HeaderLeft = ({ title }) => {
  const location = useLocation();
  return (
    <>
      <h1 className="absolute top-5 left-[50%] translate-x-[-50%] text-3xl text-center mt-6 font-bold">
        {title}
      </h1>
      <div className="md:w-[67%]  lg:w-[50%] md:mb-6 mb-12 relative">
        <img
          src="https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Real Estate"
          className="w-[70%] rounded-2xl mx-auto"
        />
      </div>
    </>
  );
};

export default HeaderLeft;
