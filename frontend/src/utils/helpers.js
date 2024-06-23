import React from "react";
import ReactDOM from "react-dom";
import Confirm from "../components/confirm";

const formatDate = (value) => {
    const d = new Date(value);
    const m = d.getMonth() + 1;
    const day = d.getDate();

    return d.getFullYear()
        + '-'
        + (m < 10 ? '0' : '')
        + m
        + '-'
        + (day < 10 ? '0' : '')
        + day;
}

const confirm = ({
    text = '',
    callback = null,
}) => {
    const body = document.getElementsByTagName('body')[0];
    const container = document.createElement('div');
    const overlay = document.createElement('div');
    const target = document.createElement('div');

    overlay.classList.add('overlay');
    container.append(overlay);
    container.append(target);
    body.append(container);

    ReactDOM.render(
        <React.StrictMode>
            <Confirm
                text={text}
                callback={(result) => {
                    callback(result).then((r) => {
                        container.remove();
                    }).catch((err) => {
                        alert(err.toString());
                    });
                }} />
        </React.StrictMode>,
        target
    );
};

const isArray = (value) => {
    return typeof value !== 'undefined' && value && Array.isArray(value);
};

export {
    formatDate,
    confirm,
    isArray,
};
