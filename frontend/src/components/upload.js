import React from 'react';
import Button from './button';
import processFiles from '../utils/process-files';

const Upload = ({
    onUploaded,
}) => {

    const inputElementId = 'upload';

    const processImages = (whenDone) => {
        processFiles(document.getElementById(inputElementId).files, whenDone);
    };

    const doUpload = () => processImages(onUploaded);

    return <>
        <div className="upload">
            <Button onClick={(e) => {
                e.preventDefault();
                document.getElementById(inputElementId).click();
            }} text={'Upload \u{1F4C2}'} />
            <input
                id={inputElementId}
                multiple={true}
                type="file"
                onChange={() => doUpload()}
            />
        </div>
    </>
};

export default Upload;
