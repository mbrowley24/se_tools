import React from "react";
import useSalesRep from "../../../../hooks/useSalesRep";

function OpportunityAmount({name, value, inputChange, edit}){
    const {addCommas} = useSalesRep();
    
    return(
        <td>
            {edit?
                    <input type="text" 
                    name={name}
                    value={value?addCommas(value): ""}
                    onChange={(e)=>inputChange(e)}
            />

            : value? `$${addCommas(value)}` : "$0.00"
        
            }
            
        </td>
    )
}
export default OpportunityAmount;