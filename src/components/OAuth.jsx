import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { db } from "../firebase";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  const googleSignUp = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
      const docRef = doc(db, "users", response.user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setDoc(docRef, {
          name: response.user.displayName,
          email: response.user.email,
          timestamp: serverTimestamp(),
        });
      }
      toast.success("Successfully registered with google!");
      navigate("/");
    } catch (err) {
      toast.error("An error occured with google registration");
    }
  };

  return (
    <button
      onClick={googleSignUp}
      type="button"
      className="w-full py-2 hover:bg-red-600 transition ease-in bg-red-500 text-white shadow-md hover:shadow-lg active:bg-red-700 flex gap-1 items-center justify-center"
    >
      Continue with Google
      <FcGoogle className=" rounded-full bg-white " />
    </button>
  );
};

export default OAuth;
