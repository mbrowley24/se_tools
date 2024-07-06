import React, {useMemo} from "react";
import SaveButton from "../../../form/SaveButton";
import ResetButton from "../../../form/ResetButton";
import useHttp from "../../../../hooks/useHttp";



function MeetingAction({data, dispatch, error, edit, canEdit}){

    const errorCheck = useMemo(()=>Object.keys(error).length > 0, [error]);
    const reset = () => { 
        dispatch({type: "reset"})
        canEdit();
    };
    const {httpRequest} = useHttp();
    
    function save(e){
        e.preventDefault();
        
        console.log(data.id);
        const configRequest = {
            url: `api/v1/meetings/${data.id}`,
            method: "POST",
            data: data
        }

        function applyData(res){
            console.log(res);
            if(res.status === 200){

                dispatch({type: "update", payload: res.data});
                canEdit();
            
            }
        }


        (async()=>{
            await httpRequest(configRequest, applyData);
        })()
        
    }

    return(
        <>
        {
            edit?
            <>
                <button className="reset" onClick={()=>canEdit()}>reset</button>
                <button className="save" onClick={(e)=>save(e)} >Save</button>
            </>
            :
            <>
                <button className="edit" onClick={()=>canEdit()}>Edit</button>
                <button className="delete">Delete</button>
            
            </>

        
        }
        </>
    )
} 
export default MeetingAction;