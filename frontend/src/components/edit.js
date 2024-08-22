import React, { useState } from "react";
import Button from "./button";
import renderInput from "./render-input";
import CharsCounter from "./chars-counter";
import Images from "../contexts/images";

const Edit = ({ fields = [], save = null, cancel = null, data: d = {}, readOnly = false, isProcessing = false }) => {

    const [data, setData] = useState(d);

    const [jsonVisible, setJsonVisible] = useState(false);

    const handleFieldUpdate = (field, newValue) => {
        const newData = { ...data };
        newData[field] = newValue;
        setData(newData);
    }

    const handleSave = (e) => {
        e.preventDefault();
        save && save(data);
    }

    const charsCounter = (field) => {
        return ((field.dataType === 'text' || !field.dataType)
            && field?.maxLength
        )
            ? <CharsCounter value={data[field.dataField]} max={field.maxLength} />
            : null;
    };

    return (
        <div className={"edit" + (isProcessing ? ' edit--is-processing' : '')}>
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
                                        readOnly,
                                    })}
                                </div>
                            </div>
                        })
                    }
                    <Images
                        images={data.images}
                        onUploaded={(images) => {
                            const newImages = [...data.images, ...images];
                            handleFieldUpdate('images', newImages);
                        }}
                        onRemove={(image) => {
                            const newData = { ...data };
                            const newImages = data.images.filter((image_) => {
                                return image_ != image;
                            });

                            // handleFieldUpdate('images', newImages);
                            newData['images'] = newImages;

                            if (image.id) {
                                const removeImages = data.removeImages === undefined
                                    ? []
                                    : [...data.removeImages];

                                if (!removeImages.includes(image.id)) {
                                    removeImages.push(image.id);
                                }

                                // handleFieldUpdate('removeImages', removeImages);
                                newData['removeImages'] = removeImages;
                            }

                            setData(newData);
                        }}
                    />
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
                        {save && <Button text="Save" type="submit" />}
                        <Button text="Cancel" onClick={cancel} />
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default Edit;