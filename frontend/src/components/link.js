import React from "react";

const Link = ({
    onClick,
    children,
    href,
}) => {
    const handleOnClick = (e) => {
        e.preventDefault();
        onClick();
    };

    return (
        <a
            className="link"
            href={href}
            onClick={handleOnClick}>{children}</a>
    )
};

export default Link;
