import React, {useMemo} from "react";
import useHttp from "../../../hooks/useHttp";




function NewISPActions({isp, reset, errors, dispatch, actions}) {
    const {httpRequest} = useHttp();
    const valid = useMemo(()=>Object.keys(errors).length === 0, [errors]);
    function createISP(e){

        e.preventDefault();
        
        const ispObj = {...isp};
        reset();

        const configRequest = {
            method: "POST",
            url: "api/v1/isp",
            data: ispObj
        }

        function applyData(res){

            if(res.status === 200){
                console.log(res.data);
                dispatch(actions.addISP(res.data));
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData);
        })()
    }


    return(
        <td colSpan={2}>
            <button 
                    className="actions update"
                    disabled={!valid}
                    onClick={(e)=>createISP(e)}
                    >Create</button>
            <button className="actions" onClick={()=>reset()}>Reset</button>
        </td>
    )
}

export default NewISPActions;