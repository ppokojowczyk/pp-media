import React from 'react';
import { getApiUrl } from '../utils/api';
import Button from './button';

const Image = ({
    image,
    onRemove,
}) => {
    const url = image.id ? getApiUrl(`/image/${image.id}`) : '';
    const thumbUrl = image.id ? getApiUrl(`/image/thumb/${image.id}`) : '';

    const openImage = () => url && window.open(url);

    return <div className="image">
        <Button
            className='image-remove'
            text='&#128465;'
            onClick={(e) => {
                e.preventDefault();
                onRemove();
            }}
        />
        <div className="image-image"
            style={{
                backgroundImage: 'url(' + (image?.data || thumbUrl) + ')',
                backgroundPosition: '50% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
            onClick={openImage}
        />
    </div>
};

export default Image;
