import React from "react";



function TextField({className, name, placeholder, type, value, onChange, label}) {
    return (
        <>
        {label && <label>{label}</label>}
        <input type={type}
                name={name}
                className={className}
                placeholder={placeholder}
                value={value}
                onChange={(e)=>onChange(e)}
            />
        </>
    )
}

export default TextField;