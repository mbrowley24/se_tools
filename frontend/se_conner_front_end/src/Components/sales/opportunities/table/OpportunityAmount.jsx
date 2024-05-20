import React from "react";


function OpportunityAmount({amount, update, inputChange}){

    return(
        <td>
            {update?
                <input type="text" value={amount} onChange={inputChange}/>
            :
                <td>{amount}</td>
            }
        </td>
    )
}
export default OpportunityAmount;