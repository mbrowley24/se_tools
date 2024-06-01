import React, {useMemo} from "react";
import useHttp from "../../../hooks/useHttp";
import useISP from "../../../hooks/useISP";
import { dispatch } from "d3";



function UpdateISP({isp, ispData, dispatch}) {
    const {httpRequest} = useHttp();
    const {ispUpdate, FIELDS} = useISP();
    const updateISP = useMemo(()=>ispUpdate(isp, ispData.isp), [ispData]);
    
    function update(e){
        e.preventDefault();

        const configRequest = {
            url: "api/v1/isp",
            method: "PUT",
            data: ispData.isp
        }

        function applyData(res){
            if(res.status === 200){
                dispatch({type: FIELDS.UPDATE, payload: res.data.data})
                
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData)
        })()
    }
    
    
    return(
        <td>
            <button 
                className="actions update"
                disabled={!updateISP}
                onClick={(e)=>update(e)}
                >Update</button>
            <button className="actions">Delete</button>
        </td>
    )
};

export default UpdateISP;