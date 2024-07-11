import React from "react";
import { formatDate } from "../utils/helpers";
import Check from "./check";
import Select from "./select";
import Choice from "./choice";

const renderInput = ({
    field,
    data,
    handleFieldUpdate,
}) => {
    const value = data[field.dataField];
    const fieldName = field.dataField;

    if (field.fieldType === 'choice') {
        return <Choice
            value={value}
            data={field.data.map(d => {
                return { value: d.name, name: d.display };
            })}
            onChange={(newValue) => {
                handleFieldUpdate(fieldName, newValue);
            }}
        />;
    }

    if (field.fieldType === 'select') {
        return <Select
            value={value}
            data={field.data.map(d => {
                return { value: d.name, name: d.display };
            })}
            onChange={(newValue) => {
                handleFieldUpdate(fieldName, newValue);
            }}
        />;
    } else if (field.dataType === 'boolean') {
        return <Check
            value={data[field.dataField] === true}
            onChange={(v) => {
                handleFieldUpdate(field.dataField, v);
            }}
        />;
    } else if (field.dataType === 'text') {
        return <textarea
            className="input input-textarea"
            onChange={(e) => {
                handleFieldUpdate(field.dataField, e.target.value);
            }}
            maxLength={field?.maxLength}
        >{data[field.dataField]}</textarea>
    } else if (field.dataType === 'date') {
        return <input
            className="input input-date"
            onChange={(e) => {
                handleFieldUpdate(field.dataField, e.target.value);
            }}
            type="date"
            value={
                formatDate(data[field.dataField])
            }
        />
    } else if (field.dataType === 'number') {
        return <input
            className="input input-number"
            onChange={(e) => {
                handleFieldUpdate(field.dataField, e.target.value);
            }}
            type="number"
            step={1}
            value={value}
            min={field.min}
            max={field.max}
        />
    }

    return (<input
        className="input"
        placeholder={field.caption}
        value={data[field.dataField]}
        maxLength={field?.maxLength}
        onChange={(e) => {
            handleFieldUpdate(field.dataField, e.target.value)
        }}
    />)
};

export default renderInput;
