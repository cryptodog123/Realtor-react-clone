import React from "react";
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  return (
    <button className="w-full py-2 hover:bg-red-600 transition ease-in bg-red-500 text-white shadow-md hover:shadow-lg active:bg-red-700 flex gap-1 items-center justify-center">
      Continue with Google
      <FcGoogle className=" rounded-full bg-white " />
    </button>
  );
};

export default OAuth;
