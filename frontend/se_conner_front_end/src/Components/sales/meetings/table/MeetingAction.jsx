import React, {useMemo} from "react";
import SaveButton from "../../../form/SaveButton";
import ResetButton from "../../../form/ResetButton";
import useHttp from "../../../../hooks/useHttp";



function MeetingAction({data, dispatch, error, id, edit, canEdit}){

    const errorCheck = useMemo(()=>Object.keys(error).length > 0, [error]);
    const reset = () => { 
        dispatch({type: "reset"})
        canEdit();
    };
    const {httpRequest} = useHttp();
    
    function save(e){
        e.preventDefault();
        
        const configRequest = {
            url: `api/v1/opportunities/${id}/meetings`,
            method: "POST",
            data: data
        }

        function applyData(res){
            console.log(res);
            if(res.status === 200){
                dispatch({type: "new_meeting", payload: res.data});
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
                {/* <SaveButton save={save} disable={errorCheck}/> */}
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