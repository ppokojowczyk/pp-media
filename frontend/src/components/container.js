import React from 'react';

const Container = ({
    id,
    className,
    children,
    onClick,
    style,
    onDrop,
    onDragOver,
}) => {
    return (
        <div
            id={id}
            className={className}
            onClick={onClick}
            style={style}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >{children}</div>
    )
};

export default Container;
