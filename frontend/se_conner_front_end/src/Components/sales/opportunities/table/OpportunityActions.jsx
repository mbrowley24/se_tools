import React from "react";
import ResetButton from "../../../form/ResetButton";
import OpportunitySave from "./OpportunitySave";


function OpportunityActions({opportunity, update, reset}){


    return(
        <td>
            {
                update?
                        <>
                            <OpportunitySave opportunity={opportunity} update={update}/>
                            <button className="reset"
                                onClick={()=>reset()}
                            >Reset</button>
                        </>
                        
                    :
                    <>
                        <button className="delete">Delete</button>
                    </>
            }
        </td>
    )
}

export default OpportunityActions;