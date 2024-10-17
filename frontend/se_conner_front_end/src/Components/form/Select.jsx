import React from "react";





function Select({className, name, value, onChange, label, options, multiple}) {
    
    return (
        <>
        <label>{label}</label>
        <select
            multiple={multiple}
            className={className}
            name={name}
            value={value}
            onChange={(e)=>onChange(e)}
            >
                { options  && options.length > 0  && options.map((option, index)=>(
                    <option key={index} value={option.value}>{option.name}</option>
                ))}
                {
                    options && options.length === 0 && <option value="">No options available</option>
                }
                {
                    !options && <option value="">No options available</option>
                }
        </select>
        </>
    )
}

export default Select;