import React from "react";
import OAuth from "../OAuth";

const Buttons = ({ text }) => {
  return (
    <>
      <button className="w-full py-2 mt-4 hover:bg-blue-600 transition ease-in bg-blue-500 text-white shadow-md hover:shadow-lg active:bg-blue-700">
        {text}
      </button>
      <div className="text-center flex items-center before:border-t before:flex before:flex-1  after:border-t after:flex after:flex-1 before:border-t-gray-400 after:border-t-gray-400  ">
        <p className="font-semibold text-md mx-4 my-4  ">or</p>
      </div>
      <OAuth />
    </>
  );
};

export default Buttons;
