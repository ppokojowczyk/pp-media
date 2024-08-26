import React, { useEffect, useState } from 'react';
import Image from '../components/image';
import Upload from '../components/upload';
import DragAndDrop from '../components/drag-and-drop';
import ImagesHub from '../components/images-hub';

const IMAGES_HUB_URL = process.env.REACT_APP_PP_IMAGES_HUB_URL ?? false;

const Images = ({
    images,
    onUploaded,
    onRemove,
}) => {
    return <div className="images">
        <div className="images-header">Images <Upload
            onUploaded={onUploaded}
        />
            {
                IMAGES_HUB_URL && <ImagesHub
                    hubUrl={IMAGES_HUB_URL}
                    callback={onUploaded}
                />
            }
        </div>
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
