import React from "react";

const Button = ({ text = "", className = "", onClick = null }) => {
  return (
    <button
      className={["button"].concat(className).join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
