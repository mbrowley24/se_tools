import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { salesRepActions } from "../../../../store/salesRep";
import useHttp from "../../../../hooks/useHttp";
import useForecast from "../../../../hooks/useForecast";

function ForecastValueData({data}){
    const salesData = useSelector(state=>state.salesRepData);
    const dispatch = useDispatch();
    const {httpRequest} = useHttp();
    const {percentage} = useForecast();

    useEffect(() => {
        
        const reps = salesData.reps.length;

        if(reps > 0) return;

        const configRequest={
            url: 'api/v1/sales-reps',
            method: 'GET',
            responseType: 'json'
        }

        function applyData(res){
            if(res.status === 200){
                
                dispatch(salesRepActions.addReps(res.data));
                
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData)
        })()

    },[data])
    

    return(
        <div className="value_pannel">
            <div>
                <h4>Value: ${data.value}</h4>
            </div>
            <div>
                <h4>Quota: ${salesData.quota}</h4>
            </div>
            <div>
                <h4>{percentage(data.value, salesData.quota)}%</h4>
            </div>
        </div>
        
    )
}

export default ForecastValueData;