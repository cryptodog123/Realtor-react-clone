import React, { useState } from "react";

import HeaderLeft from "../components/SignInSignUp/HeaderLeft";
import Input from "../components/Input";
import PasswordInput from "../components/SignInSignUp/PasswordInput";
import SmallText from "../components/SignInSignUp/SmallText";
import Buttons from "../components/SignInSignUp/Buttons";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <div className=" relative flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto pt-[125px]">
        <HeaderLeft title={"Sign In"} />
        <div className="sm:w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
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
              text={"Don't have an account yet?"}
              actionCall={"Register now!"}
              to={"/sign-up"}
            />
            <Buttons text={"Sign In"} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
