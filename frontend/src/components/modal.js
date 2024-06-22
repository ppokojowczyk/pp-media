import React from "react";

const Modal = ({
    title,
    children,
}) => {
    return (
        <>
            <div className="overlay">
                <div class="modal">
                    <h2 class="modal-title">{title}</h2>
                    <div class="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Modal;
