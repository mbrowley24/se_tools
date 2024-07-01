import React from "react";
import SaveButton from "../../../form/SaveButton";
import ResetButton from "../../../form/ResetButton";
import DeleteButton from "../../../form/DeleteButton";
import EditButton from "../../../form/EditButton";




function ForecastActions({data, errors, update}){
    console.log(data)
    return(
        <td>
            {
                update? <>
                    <SaveButton/>
                    <ResetButton/>
                </>
                :
                <>
                    <EditButton/>
                    <DeleteButton/>
                </>
                
            }
        </td>
    )
}

export default ForecastActions;