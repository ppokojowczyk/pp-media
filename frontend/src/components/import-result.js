import React from "react";

const ImportResult = ({
    insert,
    update,
    total,
    saved,
    failed,
}) => {
    return <div className="import-result">
        {insert >= 0 && <span className="import-result-item import-result-item--insert">New: {insert}</span>}
        {update >= 0 && <span className="import-result-item import-result-item--update">Update: {update}</span>}
        <span className="import-result-item import-result-item--saved">Saved: {saved}</span>
        <span className="import-result-item import-result-item--failed">Failed: {failed}</span>
        <span className="import-result-item import-result-item--total">Total: {total}</span>
    </div>
};

export default ImportResult;
