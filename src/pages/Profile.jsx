import React from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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
        <form className="w-full md:w-[50%] xl:w-[42%] px-10 md:px-0">
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
      </section>
    </>
  );
};

export default Profile;
