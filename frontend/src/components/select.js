import React from "react";

const Select = ({
    value = [],
    data = [],
    onChange = null,
    readOnly,
}) => {
    const handleChange = (v) => {
        if (readOnly) {
            return;
        }

        const newValue = [...value];
        const currentIndex = newValue.indexOf(v);

        (currentIndex !== -1)
            ? newValue.splice(currentIndex, 1)
            : newValue.push(v);

        onChange(newValue);
    };

    const isSelected = (v) => {
        return value.indexOf(v) !== -1;
    }

    return (
        <div className="input input-select">
            {data.map((item) => {
                return <div
                    className={`input-select-item ${isSelected(item.value) ? 'input-select-item--active' : ''}`}
                    onClick={() => handleChange(item.value)}
                >{item.name}</div>
            })}
        </div>
    )
};

export default Select;
