import React from "react";
import useHttp from "../../../hooks/useHttp";


function UpdateISPService({data, reset, id, update, addService}){
    const {httpRequest} = useHttp();

    function submit(e){
        e.preventDefault();
        
        const configRequest={
            method: 'PUT',
            url: `api/v1/isp/categories/${id}`,
            data: data
        }

        function applyData(res){
            if(res.status === 200){
                addService(res.data);
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();
    }

    return(
        <td>
            <button className="actions update"
                disabled={!update}
                onClick={submit}
            >Update</button>
            <button className="actions"
                onClick={reset}
            >Reset</button>
        </td>
    )
}

export default UpdateISPService;