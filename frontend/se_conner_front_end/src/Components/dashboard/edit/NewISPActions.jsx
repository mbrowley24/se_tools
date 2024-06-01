import React, {useMemo} from "react";
import useHttp from "../../../hooks/useHttp";
import useISP from "../../../hooks/useISP";



function NewISPActions({isp, reset}) {
    const {httpRequest} = useHttp();
    const {validUpdate} = useISP();
    const valid = useMemo(()=>validUpdate(isp), [isp]);
    function createISP(e){

        e.preventDefault();
        
        const configRequest = {
            method: "POST",
            url: "api/v1/isp",
            data: isp
        }

        function applyData(res){

            if(res.status === 200){
                reset();
            }
            console.log(res);
        }

        (async()=>{
            await httpRequest(configRequest, applyData);
        })()
    }


    return(
        <td colSpan={2}>
            <button 
                    className="actions"
                    disabled={!valid}
                    onClick={(e)=>createISP(e)}
                    >Create</button>
            <button className="actions" onClick={()=>reset()}>Reset</button>
        </td>
    )
}

export default NewISPActions;