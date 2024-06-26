import React from "react";
import SaveButton from "../../../form/SaveButton";
import ResetButton from "../../../form/ResetButton";
import DeleteButton from "../../../form/DeleteButton";




function ForecastActions({data, errors, update}){

    return(
        <td>
            {
                update? <>
                    <SaveButton/>
                    <ResetButton/>
                </>
                :
                <DeleteButton/>
            }
        </td>
    )
}

export default ForecastActions;