import React from "react";
import useSalesRep from "../../../../hooks/useSalesRep";

function OpportunityAmount({amount, update, inputChange}){
    const {addCommas} = useSalesRep();
    console.log(amount);
    return(
        <td>
            <input type="text" value={addCommas(amount)} onChange={inputChange}/>
        </td>
    )
}
export default OpportunityAmount;