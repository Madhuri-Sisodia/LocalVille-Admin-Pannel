import React from "react";

const SuccessNotify = (message) => {
    return {
        place: "tr",
        message: (
            <div>
                <div>
                    <b>{message}</b>
                </div>
            </div>
        ),
        type: "success",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 7,
    };
}

const ErrorNotify = (message) => {
    return {
        place: "tr",
        message: (
            <div>
                <div>
                    <b>{message}</b>
                </div>
            </div>
        ),
        type: "danger",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 7,
    };
}

export {SuccessNotify, ErrorNotify};