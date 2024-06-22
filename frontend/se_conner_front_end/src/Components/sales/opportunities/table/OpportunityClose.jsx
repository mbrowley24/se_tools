import React from "react";




function OpportunityClose({inputChange, name, value}){
    
    return(
        <td>

            <input
                type="date"
                name={name}
                value={value}
                onChange={(e)=>inputChange(e)}
            />
                
        </td>
    )
}

export default OpportunityClose;