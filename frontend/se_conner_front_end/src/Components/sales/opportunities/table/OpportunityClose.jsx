import React from "react";




function OpportunityClose({inputChange, name, value, edit}){
    
    return(
        <td>
            {edit? 

                <input
                    type="date"
                    name={name}
                    value={value}
                    onChange={(e)=>inputChange(e)}
                />
            
            : 
            
                value
            
            }
            
                
        </td>
    )
}

export default OpportunityClose;