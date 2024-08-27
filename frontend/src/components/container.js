import React from 'react';

const Container = ({
    className,
    children,
    onClick,
    style,
}) => {
    return (
        <div
            className={className}
            onClick={onClick}
            style={style}
        >{children}</div>
    )
};

export default Container;
