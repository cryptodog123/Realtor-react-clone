import React from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [name] = useState(auth.currentUser.displayName);
  const [email] = useState(auth.currentUser.email);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
    toast.success("You have been logged out.");
  };

  return (
    <>
      <section className="flex flex-col items-center">
        <h1 className="font-bold text-4xl mt-10">My Profile</h1>
        <form className="w-full md:w-[50%] xl:w-[42%] px-10 md:px-0">
          <input type="text" disabled defaultValue={name} className="w-full " />
          <input
            type="email"
            disabled
            defaultValue={email}
            className="w-full mt-2"
          />
          <div className="flex justify-between whitespace-nowrap text-sm md:text-md">
            <p className=" items-center">
              Do you want to change your name?{" "}
              <span className="text-red-400 hover:text-red-700 transition ease-in cursor-pointer">
                Edit
              </span>
            </p>
            <p
              className="text-blue-400 hover:text-blue-600 transition ease-in cursor-pointer"
              onClick={onLogout}
            >
              Sign Out
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;
