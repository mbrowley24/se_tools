import React, {useState} from "react";




function OpportunityName({name, update, inputChange}){


    return(
        <td>
            <input type="text" 
                value={name}
                onChange={(e)=>inputChange(e)}
            />
        </td>
        
    )
}

export default OpportunityName;