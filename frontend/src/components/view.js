import React, { useState } from "react";
import Edit from "./edit";

const View = ({
    fields,
    data,
    cancel,
}) => {
    return <div className="view">
        <Edit
            fields={fields}
            data={data}
            cancel={cancel}
            readOnly={true}
        />
    </div>
};

export default View;
