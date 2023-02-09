import React from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { HomeModernIcon } from "@heroicons/react/outline";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [name, setName] = useState(auth.currentUser.displayName);
  const [email, setEmail] = useState(auth.currentUser.email);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
    toast.success("You have been logged out.");
  };

  const handleProfileChange = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name });
        toast.success("Profile changed successfully.");
      }
    } catch (err) {
      toast.error("Unable to update profile details");
      console.log(err);
    }
  };

  const editProfile = () => {
    changeDetail && handleProfileChange();
    setChangeDetail(!changeDetail);
  };

  const onChange = (e) => {
    console.log(e.target.id);
    e.target.id === "email"
      ? setEmail(e.target.value)
      : setName(e.target.value);
  };

  return (
    <>
      <section className="flex flex-col items-center">
        <h1 className="font-bold text-4xl mt-10">My Profile</h1>
        <div className="w-full md:w-[50%] xl:w-[42%] px-10 md:px-0">
          <form>
            <input
              type="text"
              disabled={!changeDetail}
              defaultValue={name}
              id="name"
              className={`w-full ${changeDetail && "bg-[#64ff646a]"}`}
              onChange={onChange}
            />
            <input
              type="email"
              id="email"
              disabled={!changeDetail}
              defaultValue={email}
              className={`w-full mt-2 ${changeDetail && "bg-[#64ff646a]"}`}
              onChange={onChange}
            />
            <div className="flex justify-between whitespace-nowrap text-sm md:text-md">
              <p className=" items-center">
                Do you want to change your name?{" "}
                <span
                  className="text-red-400 hover:text-red-700 transition ease-in cursor-pointer"
                  onClick={editProfile}
                >
                  {changeDetail ? "Apply changes" : "Edit"}
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
          <button className="bg-blue-500 w-full p-3 text-white font-semibold mt-6 text-sm uppercase">
            <Link
              to="/create-listing"
              className="flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                />
              </svg>
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;
