/**
 * @todo temporary component, should be moved to pp-images-hub
 * @todo eventually it should be provided as compiled js bundle/component/etc.
 */

import React, { useEffect, useState } from 'react';
import Button from './button';
import Modal from './modal';
import processFiles from '../utils/process-files';

const fetchRecentImage = (endpoint) => fetch(endpoint + '/recent')
    .then(response => response.json())
    .then(({ src = null }) => !src ? null : fetch(endpoint + src))
    .then(response => response ? response.blob() : null);

const ImagesHubRecentImage = ({
    hubUrl,
    onUploaded,
}) => {

    const [message, setMessage] = useState('');

    const [timeout, setTimeoutx] = useState(null);

    const initialText = 'Fetch Recent Image From Hub \u{1F4C2}';

    useEffect(() => {
        if (timeout) {
            clearTimeout(timeout);
            setTimeoutx(null);
        }
        if (message) {
            setTimeoutx(setTimeout(() => {
                setMessage('');
            }, 1000));
        }
    }, [message]);

    const handleFetch = () => {
        fetchRecentImage(hubUrl).then((image) => {
            if (!image) {
                setMessage('Image not found.');
                return;
            }

            processFiles([image], (images) => {
                onUploaded(images);
                setMessage('Image processed.');
            });
        }).catch(err => alert(err.toString()));
    };

    return (
        <div className="images-hub">
            <Button
                disabled={!!timeout}
                onClick={(e) => {
                    e.preventDefault();
                    handleFetch();
                }} text={message || initialText} />
        </div>
    )
};

const ImagesHubList = ({
    hubUrl,
    callback,
}) => {

    const [imagesModalVisible, setImagesModalVisible] = useState(false);

    const [images, setImages] = useState(false);

    const [error, setError] = useState(false);

    const showImagesList = () => {
        setImagesModalVisible(true);
    };

    const fetchImages = () => {
        fetch(`${hubUrl}/images`)
            .then(response => response.json())
            .then(({ images }) => {
                setImages(images);
            }).catch(err => {
                setError(true);
            });
    };

    useEffect(() => {
        images === false && fetchImages();
    }, [showImagesList]);

    if (error) {
        return <div>Hub Images Failed</div>;
    };

    return (
        <div className="images-hub">
            {imagesModalVisible &&
                <Modal
                    title='Images Hub'
                >
                    <div className="images-hub-list">
                        {images && images.map(image => {
                            return <div className="images-hub-image">
                                <img src={hubUrl + image.thumbnail}
                                    onClick={() => {
                                        setImagesModalVisible(false);

                                        if (!image.src) {
                                            setError('No image src.');
                                            return;
                                        }
                                        const url = hubUrl + image.src;
                                        fetch(url).then(img => {
                                            return img.blob();
                                        }).then(b => {
                                            processFiles([b], callback);
                                        });
                                    }}
                                />
                            </div>
                        })}
                    </div>
                    <hr style={{ clear: 'both' }} />
                    <Button
                        text="Cancel"
                        onClick={() => {
                            setImagesModalVisible(false);
                        }}
                    />
                </Modal>
            }
            <Button
                onClick={showImagesList}
                text={`Images Hub \u{1F4C2}`}
            ></Button>
        </div >
    );
};

const ImagesHub = ({
    hubUrl,
    callback,
}) => {

    if (!hubUrl) {
        throw new Error('No Images Hub URL defined.');
    }

    return <>
        <ImagesHubList
            hubUrl={hubUrl}
            callback={callback}
        />
        <ImagesHubRecentImage
            hubUrl={hubUrl}
            onUploaded={callback}
        />
    </>
};

export default ImagesHub;
