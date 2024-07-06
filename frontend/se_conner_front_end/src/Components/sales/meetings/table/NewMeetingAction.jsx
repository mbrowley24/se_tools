import React, {useMemo} from "react";
import useHttp from "../../../../hooks/useHttp";
import SaveButton from "../../../form/SaveButton";
import ResetButton from "../../../form/ResetButton";

function NewMeetingAction({data, dispatch, error, id}){

    const errorCheck = useMemo(()=>Object.keys(error).length > 0, [error]);
    const reset = ()=> dispatch({type: "reset"});
    const {httpRequest} = useHttp();

    
    function save(e){
        e.preventDefault();
        
        const configRequest = {
            url: `api/v1/opportunities/${id}/meetings`,
            method: "POST",
            data: data
        }

        function applyData(res){
            
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
            <SaveButton save={save} disable={errorCheck}/>
            <ResetButton reset={reset}/>
        </>
    )
}

export default NewMeetingAction;