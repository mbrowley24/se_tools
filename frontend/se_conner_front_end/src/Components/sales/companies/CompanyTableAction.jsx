import React from "react";
import SaveButton from "../../form/SaveButton";
import ResetButton from "../../form/ResetButton";
import DeleteButton from "../../form/DeleteButton";



function CompanyTableAction({edit, valid}){

    return(
        <td>
            {
                edit ? 
                    <>
                        <SaveButton disable={!valid}/>
                        <ResetButton/>
                    </>

                :
                    <DeleteButton/>
            }
            
        </td>
    )
}

export default CompanyTableAction;