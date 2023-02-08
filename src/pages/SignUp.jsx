import React, { useState } from "react";

import HeaderLeft from "../components/SignInSignUp/HeaderLeft";
import Input from "../components/Input";
import PasswordInput from "../components/SignInSignUp/PasswordInput";
import SmallText from "../components/SignInSignUp/SmallText";
import Buttons from "../components/SignInSignUp/Buttons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: fullName,
      });
      const user = userCredentials.user;
      await setDoc(doc(db, "users", user.uid), {
        email,
        fullName,
        timestamp: serverTimestamp(),
      });
      toast.success("Sign up was successfull!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong with registration!");
    }
  };

  return (
    <section>
      <div className=" relative flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto pt-[125px]">
        <HeaderLeft title={"Sign Up"} />
        <div className="sm:w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <Input
              defaultValue={fullName}
              placeholder={"Full name"}
              type={"text"}
              callback={setFullName}
            />
            <Input
              defaultValue={email}
              placeholder={"Email@example.com"}
              type={"email"}
              callback={setEmail}
            />
            <PasswordInput
              showPassword={showPassword}
              password={password}
              setPassword={setPassword}
              setShowPassword={setShowPassword}
            />
            <SmallText
              text={"Already have an account?"}
              actionCall={"Sign in!"}
              to={"/sign-in"}
            />
            <Buttons text={"Sign Up"} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
