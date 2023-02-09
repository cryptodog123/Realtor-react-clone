import React from "react";

const Input = ({ defaultValue, placeholder, type, callback }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(e) => callback(e.target.value)}
      className="input  my-2"
    />
  );
};

export default Input;
