import React from "react";

const Header = ({
    children,
}) => {
    return (
        <h1 className="header"><span className="header-text">{children}</span></h1>
    )
};

export default Header;
