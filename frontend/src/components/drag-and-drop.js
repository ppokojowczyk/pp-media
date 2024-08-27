import React from 'react';
import Container from './container';
import processFiles from '../utils/process-files';
import { prevent } from '../utils/helpers';

const fetchRecentImage = (url) => {
    return fetch(url, {
        method: 'GET',
        mode: 'no-cors',
    }).then(response => {
        console.log(response.blob());
        return response ? response.blob() : null;
    });
};

const DragAndDrop = ({
    onUploaded,
}) => {

    const processFile = (e) => {
        e.preventDefault();
        e.dataTransfer?.files && processFiles([...e.dataTransfer.files], onUploaded);
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
