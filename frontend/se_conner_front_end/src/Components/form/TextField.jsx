import React from "react";



function TextField({className, placeholder, type, value, onChange, label}) {
    return (
        <>
        <label>{label}</label>
        <input type={type}
                className={className}
                placeholder={placeholder}
                value={value}
                onChange={(e)=>onChange(e)}
            />
        </>
    )
}

export default TextField;