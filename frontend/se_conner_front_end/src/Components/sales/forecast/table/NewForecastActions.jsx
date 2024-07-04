import React, {useMemo} from "react";
import SaveButton from "../../../form/SaveButton";
import ResetButton from "../../../form/ResetButton";
import useHttp from "../../../../hooks/useHttp";

function NewForecastActions({data, dispatch ,errors, reset}){
    const {httpRequest} = useHttp();
    const disable = useMemo(()=> Object.keys(errors).length > 0, [errors])

    function submit(e){
        e.preventDefault();

        const forecast = JSON.parse(JSON.stringify(data));

        reset();

        const configRequest = {
            method: "POST",
            url: "api/v1/forecasts",
            data: forecast    
        }

        function applyDate(res){
            console.log(res);
            if(res.status === 200){
                dispatch({type: "add_forecast", payload: res.data});
            }
        }
        
        (async()=>{
            await httpRequest(configRequest, applyDate);
        })();

    }

    return(
        <td colSpan={'2'}>
            <SaveButton save={submit} disable={disable}/>
            <ResetButton reset={reset}/>
        </td>
    )
}

export default NewForecastActions;