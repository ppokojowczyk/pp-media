import React from 'react';
// import { upload } from '../utils';
import Button from './button';

const Upload = ({
    onUploaded,
}) => {

    const inputElementId = 'upload';

    const processImages = (whenDone) => {
        const input = document.getElementById(inputElementId);
        const files = input.files;
        const outputFiles = [];
        let done = 0;
        const callback = (e, file) => {
            outputFiles.push({
                name: 'new-upload',
                data: e.target.result,
                file,
            });
            done++;
            if (done === files.length) {
                whenDone(outputFiles);
            }
        };

        if (files.length) {
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (e) => callback(e, file);
                reader.readAsDataURL(file);
            }
        }
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
