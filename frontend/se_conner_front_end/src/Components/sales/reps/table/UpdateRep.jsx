import React, {useMemo} from "react";
import useHttp from "../../../../hooks/useHttp";




function UpdateRep({data, valid}){
    const {httpRequest} = useHttp();
    
    function submit(e){
        e.preventDefault()

        const configRequest = {
            url: `api/v1/sales-reps/${data.id}`,
            method: "PUT",
            data: data
        }

        function applyData(res){
            if(res.status === 200){
                console.log("success")
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData)
        })()
    }

    return(
        <button 
            className="update"
            onClick={(e)=>submit}
            disabled={!valid}
        >
            <span className="material-symbols-outlined">
                save
            </span>
        </button>
    )
}

export default UpdateRep;