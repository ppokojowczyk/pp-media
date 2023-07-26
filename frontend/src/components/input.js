import React from "react";

const Input = ({ value, placeholder = "", onChange = null }) => {
  return (
    <input
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className="input"
    ></input>
  );
};

export default Input;
