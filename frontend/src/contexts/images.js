import React, { useEffect, useState } from 'react';
import Image from '../components/image';
import Upload from '../components/upload';

const Images = ({
    images,
    onUploaded,
    onRemove,
}) => {
    return <div className="images">
        <div className="images-header">Images <Upload
            onUploaded={onUploaded}
        /></div>
        {images.map(image => {
            return <Image image={image} onRemove={() => {
                onRemove(image);
            }} />
        })}
    </div>
};

export default Images;
