import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const SmallText = ({ text, actionCall, to = "/sign-up" }) => {
  const location = useLocation();
  return (
    <div className="flex justify-between sm:text-sm px-1 mt-1">
      <p>
        {text}
        <Link
          className="hover:underline font-semibold text-red-600 hover:text-red-700"
          to={to}
        >
          {" "}
          {actionCall}
        </Link>
      </p>

      {location.pathname === "/sign-in" && (
        <Link
          className="text-blue-600 hover:underline "
          to={"/forgot-password"}
        >
          Forgot Password?
        </Link>
      )}
    </div>
  );
};

export default SmallText;
