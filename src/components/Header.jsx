import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
const Header = () => {
  const location = useLocation();

  const checkPathName = (route) => {
    let defaultNames =
      "py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent cursor-pointer";
    if (route === location.pathname) {
      return (defaultNames += "text-black border-b-red-500");
    } else {
      return defaultNames;
    }
  };

  return (
    <div className="bg-white border-b shadow-md">
      <header className="flex justify-between  px-2 items-center max-w-6xl mx-auto sticky top-0 z-[100]">
        <Link to="/">
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="Realtor logo"
            className="h-5 cursor-pointer"
          />
        </Link>
        <div>
          <ul className="flex space-x-10">
            <Link to={"/"} className={`${checkPathName("/")}`}>
              Home
            </Link>
            <Link to={"/offers"} className={`${checkPathName("/offers")}`}>
              Offers
            </Link>
            <Link to={"/sign-in"} className={`${checkPathName("/sign-in")}`}>
              Sign In
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
