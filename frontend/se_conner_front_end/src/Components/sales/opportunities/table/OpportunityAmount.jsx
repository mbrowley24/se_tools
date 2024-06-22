import React from "react";
import useSalesRep from "../../../../hooks/useSalesRep";

function OpportunityAmount({name, value, inputChange}){
    const {addCommas} = useSalesRep();
    
    return(
        <td>
            <input type="text" 
                    name={name}
                    value={value?addCommas(value): ""}
                    onChange={(e)=>inputChange(e)}
            />
        </td>
    )
}
export default OpportunityAmount;