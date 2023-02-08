import React, { useState } from "react";
import HeaderLeft from "../components/SignInSignUp/HeaderLeft";
import SmallText from "../components/SignInSignUp/SmallText";
import Buttons from "../components/SignInSignUp/Buttons";
import Input from "../components/Input";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <section>
      <div className=" relative flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto pt-[125px]">
        <HeaderLeft title={"Forgot Password"} />
        <div className="sm:w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <Input
              defaultValue={email}
              placeholder={"Email@example.com"}
              type={"email"}
              callback={setEmail}
            />
            <SmallText
              text={"Don't have an account yet?"}
              actionCall={"Register now!"}
            />
            <Buttons text={"Send recovery email"} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
