import React, {useMemo} from "react";
import UpdateRep from "./UpdateRep";
import DeleteRep from "./DeleteRep";
import ResetRep from "./ResetRep";




function SalesRepActions({data, errors, resetRep, update, canEdit, edit}){
    const noErrors = useMemo(() => Object.keys(errors).length === 0, [errors])
    
    
    return(
        <td>
            {
                edit?
                <>
                    <button className="reset" onClick={resetRep}>Reset</button>
                    <UpdateRep data={data}
                        errors={errors}
                        update={update}
                        valid={noErrors}
                        />
                </> 
                :
                <>
                    <button className="edit" onClick={()=>canEdit()}>Edit</button>
                    <DeleteRep data={data}/>
                </>
            }
        </td>
    )
}

export default SalesRepActions;