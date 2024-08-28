import React from 'react';
import Container from './container';
import processFiles from '../utils/process-files';
import { prevent } from '../utils/helpers';
import { getApiUrl } from '../utils/api';

const fetchRemoteImage = (url) => {
    return fetch(getApiUrl('/image/external'), {
        method: 'POST',
        body: JSON.stringify({
            url,
        }),
    }).then(response => response ? response.blob() : null);
};

const DragAndDrop = ({
    onUploaded,
}) => {

    const processFile = (e) => {
        e.preventDefault();
        if (e.dataTransfer?.files.length) {
            e.dataTransfer?.files && processFiles([...e.dataTransfer.files], onUploaded);
        } else {
            const url = e.dataTransfer.getData('text');
            url && fetchRemoteImage(url)
                .then((image) => {
                    image && processFiles([image], onUploaded);
                });
        }
    };

    return (
        <Container
            className="drag-and-drop"
            onDrop={processFile}
            onDragOver={prevent}
        >
            Drop file(s) here...
            <Container id="foo" />
        </Container>
    )
};

export default DragAndDrop;
