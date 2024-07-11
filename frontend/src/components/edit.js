import React, { useState } from "react";
import Button from "./button";
import renderInput from "./render-input";
import CharsCounter from "./chars-counter";

const Edit = ({ fields = [], save = null, cancel = null, data: d = {} }) => {

    const [data, setData] = useState(d);

    const [jsonVisible, setJsonVisible] = useState(false);

    const handleFieldUpdate = (field, newValue) => {
        const newData = { ...data };
        newData[field] = newValue;
        setData(newData);
    }

    const handleSave = (e) => {
        e.preventDefault();
        save(data);
    }

    const charsCounter = (field) => {
        return ((field.dataType === 'text' || !field.dataType)
            && field?.maxLength
        )
            ? <CharsCounter value={data[field.dataField]} max={field.maxLength} />
            : null;
    };

    return (
        <div className="edit">
            <form action="#" onSubmit={handleSave}>
                <fieldset>
                    {
                        fields.map((field, key) => {
                            return <div key={key} className={["edit-field", field.width && `edit-field-${field.width}`].join(' ').trim()}>
                                <div>
                                    <label
                                        for={field.dataField}>
                                        {field.caption}
                                    </label>
                                    {charsCounter(field)}
                                </div>
                                <div>
                                    {renderInput({
                                        field,
                                        data,
                                        handleFieldUpdate,
                                    })}
                                </div>
                            </div>
                        })
                    }
                    <hr style={{
                        clear: 'both',
                        opacity: 0,
                        height: 0,
                        border: 'none'
                    }} />
                    {
                        jsonVisible && <div>
                            <pre>
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </div>
                    }
                    <div className="buttons">
                        <Button text="JSON" onClick={(e) => {
                            e.preventDefault();
                            setJsonVisible(!jsonVisible);
                        }}></Button>
                        <Button text="Save" type="submit" />
                        <Button text="Cancel" onClick={cancel} />
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default Edit;