import React from "react";

const CharsCounter = ({
    value,
    max,
}) => {
    return <div className="chars-counter">{value.length} / {max}</div>
};

export default CharsCounter;
