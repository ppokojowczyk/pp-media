import React, { useEffect } from "react";

const Modal = ({
    title,
    children,
    onClosing,
}) => {

    const handleOutsideClick = () => {
        if (onClosing) {
            const listener = (e) => {
                if (e.target.classList.contains('overlay')) {
                    onClosing();
                    window.removeEventListener('click', listener);
                }
            };
            window.addEventListener('click', listener);
        }
    };

    const disableScroll = () => {
        const body = document.querySelector('body');
        const overflow = body.style.overflow;

        body.style.overflow = 'hidden';

        return () => {
            body.style.overflow = overflow;
        };
    };

    useEffect(handleOutsideClick, []);

    useEffect(disableScroll, []);

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
