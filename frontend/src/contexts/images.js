import React, { useEffect, useState } from 'react';
import Image from '../components/image';
import Upload from '../components/upload';
import DragAndDrop from '../components/drag-and-drop';

const Images = ({
    images,
    onUploaded,
    onRemove,
}) => {
    return <div className="images">
        <div className="images-header">Images <Upload
            onUploaded={onUploaded}
        /></div>
        <DragAndDrop
            onUploaded={onUploaded}
        />
        {images.map(image => {
            return <Image image={image} onRemove={() => {
                onRemove(image);
            }} />
        })}
    </div>
};

export default Images;
