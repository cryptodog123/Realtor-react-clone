import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const location = useLocation();
  const [userState, setUserState] = useState("Sign In");
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState("Profile");
      } else {
        setUserState("Sign In");
      }
    });
  }, [auth]);

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
            <Link
              to={`${userState === "Profile" ? "/profile" : "/sign-in"}`}
              className={`${checkPathName(
                `${userState === "Profile" ? "/profile" : "/sign-in"}`
              )}`}
            >
              {userState}
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
