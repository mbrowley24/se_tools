import React, {useLayoutEffect, useMemo, useReducer} from "react";
import ForecastTableHead from "./ForecastTableHead";
import ForecastTableBody from "./ForecastTableBody";
import useForecast from "../../../../hooks/useForecast";
import useHttp from "../../../../hooks/useHttp";
import ForecastTimeframe from "./ForecastTimeframe";
import ForecastValueData from "./ForecastValueData";


function ForecastTable(){
    const {forecastValue, months, years, forecastInitialState, forecastReducer} = useForecast();
    const [forecastData, dispatchForecastData] = useReducer(forecastReducer, forecastInitialState);

    useLayoutEffect(() => {
        
        const today = new Date();
        
        const time_frame = {month: today.getMonth() + 1, year: today.getFullYear()};

        dispatchForecastData({type: "set_time_frame", payload: time_frame})

    }, [])

    const value = useMemo(()=>forecastValue(forecastData.forecast.data), [forecastData.forecast.data]);
    const { httpRequest } = useHttp();


    useLayoutEffect(() => {
        
        const configRequest = {
            method: "GET",
            url: `api/v1/forecasts?month=${forecastData.forecast.time_frame.month}&year=${forecastData.forecast.time_frame.year}`
        }


        function applyDate(res){
            
            if(res.status === 200){
                
                dispatchForecastData({type: "set_forecast_data", payload: res.data});
            }

        }
        

        (async()=>{
            await httpRequest(configRequest, applyDate);
        })();
        
        return ()=>{};

    }, [forecastData.forecast.time_frame.year, forecastData.forecast.time_frame.month])

    return(
        <>
            <ForecastValueData data={forecastData}/>
            <ForecastTimeframe data={forecastData} 
                            dispatch={dispatchForecastData}
                            months={months} 
                            years={years}
                            />
            <table>
                <ForecastTableHead/>
                <ForecastTableBody data={forecastData.forecast.data} dispatch={dispatchForecastData}/>
            </table>
        </>
        
    )
}

export default ForecastTable;