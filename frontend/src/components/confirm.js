import React from "react";
import Button from "./button";

const Confirm = ({
    text = "",
    callback = null,
}) => {
    const handle = (result) => {
        callback(result);
    }

    return <div
        className="confirm">
        <div className="confirm-text">{text}</div>
        <div className="confirm-buttons">
            <Button text="Yes" onClick={() => handle(true)} />
            <Button text="No" onClick={() => handle(false)} />
        </div>
    </div>
};

export default Confirm;
