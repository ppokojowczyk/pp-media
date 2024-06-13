import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import renderInput from "./render-input";
import Button from "./button";
import { API_URL } from "../utils/constants";
import makeNewItem from "../utils/new-item-factory";

const Imdb = ({
    genres,
    isVisible,
    onCancel,
    onLoaded,
}) => {
    const [visible, setVisible] = useState(isVisible);
    const [errorMessage, setErrorMessage] = useState("");
    const [mediaId, setMediaId] = useState("");
    const [disabled, setDisabled] = useState(false);

    const showPopup = () => {
        setVisible(true);
        setMediaId("");
        setErrorMessage("");
    };

    const hidePopup = () => {
        setVisible(false);
        setMediaId("");
        setErrorMessage("");
        onCancel();
    };

    const showError = (error) => {
        setErrorMessage(error);
    };

    const clearError = () => {
        setErrorMessage("");
    };

    const fetchAndAdd = (e) => {
        e.preventDefault();
        clearError();
        const id = trimValue(mediaId);
        if (!id) {
            return showError("No id");
        }
        setDisabled(true);
        const cb = () => setDisabled(false);
        Axios.get(API_URL + "/imdb/" + id).then(
            (data) => {
                if (data.data !== undefined) addWithData(data.data);
                cb();
            },
            () => {
                showError("Failed.");
                cb();
            }
        );
    };

    const trimValue = (url) => {
        let val = url;
        if (val && val.indexOf("imdb.com") >= 0) {
            val = val.match(/[0-9]+[0-9]/g);
            if (typeof val[0] !== undefined) val = val[0];
        }
        return val;
    }

    const addWithData = (data) => {
        const item = makeNewItem('');
        let mediaGenres = [];

        if (data.name) {
            item.title = data.name;
        }
        if (data.datePublished) {
            item.releaseDate = new Date(data.datePublished);
        }
        if (
            typeof data.aggregateRating !== "undefined" &&
            typeof data.aggregateRating.ratingValue !== "undefined"
        ) {
            data.rating = Math.round(data.aggregateRating.ratingValue);
        }
        if (data.summary) {
            item.description = data.summary;
        }
        if (data.genre && data.genre.length) {
            let items = typeof data.genre === "string" ? [data.genre] : data.genre;
            items.forEach((genre) => {
                genres.forEach((_genre) => {
                    if (_genre.display === genre) {
                        mediaGenres.push(_genre.name);
                        return false;
                    }
                });
            });
        }
        if (mediaGenres.length) {
            item.genres = mediaGenres;
        }
        onLoaded(item);
        hidePopup();
    };

    const fupdate = (field, value) => {
        clearError();
        setMediaId(value);
    };

    return (
        <div class="imdb">
            {
                visible &&
                <form action="#" onSubmit={fetchAndAdd}>
                    <fieldset disabled={disabled}>
                        <div>
                            <label
                                for='media-id'>
                                Imdb Url
                            </label>
                        </div>
                        <div>
                            {renderInput({
                                field: {
                                    dataField: 'media-id',
                                },
                                data: mediaId,
                                handleFieldUpdate: fupdate,
                            })}
                        </div>
                        <hr style={{
                            clear: 'both',
                            opacity: 0,
                            height: 0,
                            border: 'none'
                        }} />
                        <div className="buttons">
                            <Button text="Save" type="submit" />
                            <Button text="Cancel" onClick={() => {
                                hidePopup();
                            }} />
                        </div>
                    </fieldset>
                </form>
            }
        </div>
    );
};

export default Imdb;
