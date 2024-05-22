import React from "react";




function OpportunityClose({update, close, inputChange}){
    console.log(close);
    return(
        <td>

            <input
                type="date"
                name="close"
                value={close}
                onChange={(e)=>inputChange(e)}
            />
                
        </td>
    )
}

export default OpportunityClose;