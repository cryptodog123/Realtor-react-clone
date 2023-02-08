import React from "react";

const Input = ({ defaultValue, placeholder, type, callback }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(e) => callback(e.target.value)}
      className="input"
    />
  );
};

export default Input;
