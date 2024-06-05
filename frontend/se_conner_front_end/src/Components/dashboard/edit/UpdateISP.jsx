import React from "react";
import useHttp from "../../../hooks/useHttp";





function UpdateISP({data, dispatch, update, actions}) {
    const {httpRequest} = useHttp();
    
    
    function submit(e){
        e.preventDefault();

        const configRequest = {
            url: "api/v1/isp",
            method: "PUT",
            data: data
        }

        function applyData(res){

            if(res.status === 200){
                console.log(res.data);    
                dispatch(actions.updateISP(res.data))
                
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
                disabled={!update}
                onClick={(e)=>submit(e)}
                >Update</button>
            <button className="actions">Delete</button>
        </td>
    )
};

export default UpdateISP;