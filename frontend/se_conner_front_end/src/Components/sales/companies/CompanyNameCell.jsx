import React from "react";


function CompanyNameCell({errors, inputChange, name, value}){


    return(
        <td>
            <input type="text" name={name} value={value} onChange={(e)=>inputChange(e)} />
            { errors && errors.name && <p className="errors">{errors.name}</p>}
            { errors && errors.exists && <p className="errors">{errors.exists}</p>}
        </td>
    )
}

export default CompanyNameCell;