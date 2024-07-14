import React from "react";

const Choice = ({
    data = [],
    value = null,
    onChange = () => { },
    readOnly,
    noDefault,
}) => {

    // Add default empty item.
    !noDefault && data.unshift({
        value: null,
        name: '',
    });

    const handleChange = (e) => onChange(e.target.value);

    return <select className="input input-choice" onChange={handleChange} disabled={readOnly}>
        {data.map(({
            value: v,
            name,
        }) => {
            return <option value={v} selected={value === v && 'selected'} >{name}</option>
        })}
    </select>
};

export default Choice;