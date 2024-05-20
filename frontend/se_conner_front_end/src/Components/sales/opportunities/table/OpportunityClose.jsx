import React from "react";




function OpportunityClose({update, close, inputChange}){

    return(
        <td>
            {update?

                <input
                    type="date"
                    name="close"
                    value={close}
                    onChange={(e)=>inputChange(e)}
                />
                :
                close
            }
        </td>
    )
}

export default OpportunityClose;