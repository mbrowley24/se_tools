import React, {useMemo} from "react";
import DeleteComponent from "../../../form/DeleteComponent";
import Modal from "../../../form/Modal";
import useTextTransform from "../../../../hooks/useTextTransform";
import useHttp from "../../../../hooks/useHttp";


function DeleteForecast({data, dispatch, onClose, show}){
    const {capitalizeName} = useTextTransform();
    const {httpRequest} = useHttp();
    const forecastText = useMemo(()=>`Forecast from ${capitalizeName(data.sales_rep.name)} (${data.start} to ${data.end})`, [data])
    function deleteAction(e){
        
        const configRequest = {
            url: `api/v1/forecasts/${data.id}`,
            method: "DELETE"
        }

        function applyData(res){
            console.log(res);
            if(res.status === 200){
                
                dispatch({type: "delete_forecast", payload: res.data});

                onClose();
            }
        }


        (async()=>{
            await httpRequest(configRequest, applyData);
        })()
        
    }

    return(
        <>
            
            {show? <Modal isOpen={show} 
                onClose={onClose}
                children={<DeleteComponent data={forecastText} onClose={onClose} deleteAction={deleteAction}/>}/>
            : null}
        </>
        
    )
}

export default DeleteForecast;