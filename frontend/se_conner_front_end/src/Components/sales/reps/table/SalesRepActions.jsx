import React, {useMemo} from "react";
import UpdateRep from "./UpdateRep";
import DeleteRep from "./DeleteRep";
import ResetRep from "./ResetRep";




function SalesRepActions({data, errors, resetRep, update}){
    const noErrors = useMemo(() => Object.keys(errors).length === 0, [errors])
    
    function deleteRep(id){
        console.log("delete rep", id)
    }
    
    return(
        <td>
            {
                update && noErrors && <>
                <UpdateRep data={data}
                    errors={errors}
                    update={update}
                    valid={noErrors}
                    />
                <ResetRep resetRep={resetRep}/>
                </> 
            }
            {!update && <DeleteRep data={data}/>}
        </td>
    )
}

export default SalesRepActions;