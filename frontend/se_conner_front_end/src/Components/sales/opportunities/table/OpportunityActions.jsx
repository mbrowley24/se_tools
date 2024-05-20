import React from "react";




function OpportunityActions({opportunity, update}){
    return(
        <td>
            {
                update?
                        <button>Save</button>
                    :
                    <>
                        <button>Edit</button>
                        <button>Delete</button>
                    </>
            }
        </td>
    )
}

export default OpportunityActions;