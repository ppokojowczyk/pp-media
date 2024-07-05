import React from "react";

const FileUpload = ({
    onChange,
}) => {

    return (
        <div className="file-upload">
            <label for="file">
                Upload
                <input
                    name="file"
                    type="file"
                    onChange={(e) => {
                        onChange(e.target.files[0]);
                    }}
                />
            </label>
        </div>
    )
};

export default FileUpload;
