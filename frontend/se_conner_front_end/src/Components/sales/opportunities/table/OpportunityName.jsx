import React, {useState} from "react";




function OpportunityName({name, inputChange, value}){


    return(
        <td>
            <input type="text"
                name={name} 
                value={value}
                onChange={(e)=>inputChange(e)}
            />
        </td>
        
    )
}

export default OpportunityName;