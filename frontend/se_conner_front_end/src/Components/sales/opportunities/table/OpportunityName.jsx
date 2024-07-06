import React, {useState} from "react";




function OpportunityName({name, inputChange, value, edit, error}){


    return(
        <td>
            {edit?
            <>
                <input type="text"
                    name={name} 
                    value={value}
                    onChange={(e)=>inputChange(e)}
                />
                <p className="errors">{error? error : ""}</p>
            </>
            : value
            }
        </td>
        
    )
}

export default OpportunityName;