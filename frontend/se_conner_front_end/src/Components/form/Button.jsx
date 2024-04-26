import React from "react";



function Button({className, onClick, label, disabled}) {
    return (
        <>
            <button
                disabled={disabled}
                className={className}
                onClick={onClick}>
                    {label}
            </button>
        </>
    )

};

export default Button;