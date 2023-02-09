import React from "react";
import Pulse from "../assets/svg/Pulse.svg";
const Spinner = () => {
  return (
    <div className=" absolute flex bg-black bg-opacity-30 items-center justify-center h-[100%] w-full">
      <div>
        <img src={Pulse} alt="Spinner for loading" className="h-24 " />
      </div>
    </div>
  );
};

export default Spinner;
