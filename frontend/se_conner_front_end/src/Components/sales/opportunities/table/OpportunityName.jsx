import React, {useState} from "react";




function OpportunityName({name, update, inputChange}){


    return(
        <td>
            update?
                <input type="text" value={oppName} />
            :
                <td>{name}</td>
            
        </td>
        
    )
}

export default OpportunityName;