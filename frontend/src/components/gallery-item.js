import React from 'react';
import Container from './container';

const GalleryItem = ({
    title,
    cover,
    onClick,
}) => {
    return <Container
        className="gallery-item"
        onClick={onClick}
    >
        <Container className="gallery-item__cover">
            {cover && <Container className="cover-image"
                style={{
                    backgroundImage: cover,
                }}
            />}
            {!cover && <Container className="no-cover">?</Container>}
        </Container>
        <Container className="gallery-item__title">{title}</Container>
    </Container>;
};

export default GalleryItem;
