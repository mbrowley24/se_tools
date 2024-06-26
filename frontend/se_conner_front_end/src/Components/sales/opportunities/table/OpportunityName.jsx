import React, {useState} from "react";




function OpportunityName({name, inputChange, value, error}){


    return(
        <td>
            <input type="text"
                name={name} 
                value={value}
                onChange={(e)=>inputChange(e)}
            />
            <p className="errors">{error? error : ""}</p>
        </td>
        
    )
}

export default OpportunityName;