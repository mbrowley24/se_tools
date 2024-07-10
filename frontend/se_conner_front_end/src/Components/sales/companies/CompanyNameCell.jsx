import React from "react";


function CompanyNameCell({edit, errors, inputChange, name,value}){

    
    return(
        <td>

            {
                edit?
                <>
                    <input type="text" name={name} value={value} onChange={(e)=>inputChange(e)} />
                    { errors && errors.name && <p className="errors">{errors.name}</p>}
                    { errors && errors.exists && <p className="errors">{errors.exists}</p>}
                </>
                :
                value
            }
            
            
        </td>
    )
}

export default CompanyNameCell;