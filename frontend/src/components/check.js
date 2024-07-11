import React from "react";

const Check = ({
    value = false,
    onChange = null,
    readOnly,
}) => {

    return <div
        className={`input input-check ${value === true ? 'input-check--active' : ''}`}
        onClick={() => {
            !readOnly && typeof onChange === 'function' && onChange(!value);
        }}
    >{
            value === true ? String.fromCharCode(10003) : '-'
        }</div>
};

export default Check;

