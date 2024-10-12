import React from "react";

const Button = ({ text = "", className = "", onClick = null, disabled }) => {
  return (
    <button
      className={["button"].concat(className).join(" ")}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {text}
    </button>
  );
};

export default Button;
