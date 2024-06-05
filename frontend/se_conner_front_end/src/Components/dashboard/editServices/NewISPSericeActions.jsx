import React, {useMemo} from "react";
import useHttp from "../../../hooks/useHttp";




function NewISPServiceActions({data, reset, id, errors, update, addService}){
    
    const {httpRequest} = useHttp();
    const hasErrors = useMemo(() => Object.keys(data).length > 0, [errors]);
    
    function submit(e){
        e.preventDefault();
        
        const dataObj = {...data};
        reset();

        const configRequest ={
            method : 'POST',
            url: `api/v1/isp/categories/${id}`,
            data: dataObj
        }


        function applyData(res){
            console.log(res);

            if(res.status === 200){
                if(res.data){
                    addService(res.data);
                }
            }
        }


        (async () => {
            await httpRequest(configRequest, applyData);
        })();
    }

    return(
        <td>
            <button
                disabled={!hasErrors || !update}
                onClick={submit} 
                className="actions update">Create</button>
            <button className="actions"
                onClick={reset}
            >Reset</button>
        </td>
    )
};
export default NewISPServiceActions;