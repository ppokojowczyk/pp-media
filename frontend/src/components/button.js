import React from "react";

const Button = ({
  text = "",
  className = "",
  onClick = null,
  disabled,
  type = 'button',
}) => {
  return (
    <button
      className={["button"].concat(className).join(" ")}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
