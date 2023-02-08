import React from "react";
import { EyeIcon } from "@heroicons/react/outline";
import { EyeOffIcon } from "@heroicons/react/outline";
const PasswordInput = ({
  showPassword,
  password,
  setPassword,
  setShowPassword,
}) => {
  return (
    <div className="flex h-auto relative">
      <input
        type={`${showPassword ? "text" : "password"}`}
        placeholder="Passsword"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      {showPassword ? (
        <EyeIcon
          className="icon"
          onClick={() => setShowPassword(!showPassword)}
        />
      ) : (
        <EyeOffIcon
          className="icon"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
};

export default PasswordInput;
