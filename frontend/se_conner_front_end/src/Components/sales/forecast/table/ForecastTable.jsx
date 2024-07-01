import React, {useLayoutEffect, useMemo, useState} from "react";
import ForecastTableHead from "./ForecastTableHead";
import ForecastTableBody from "./ForecastTableBody";
import useForecast from "../../../../hooks/useForecast";
import useHttp from "../../../../hooks/useHttp";


function ForecastTable(){
    const {forecastValue, months, years} = useForecast();
    const [forecast, setForecast] = useState([]);
    const [timeFrame, setTimeFrame] = useState({
        month: 0,
        year: 0,
    });

    useLayoutEffect(() => {
        
        const today = new Date();
        setTimeFrame({
            month: today.getMonth() + 1,
            year: today.getFullYear()
        })

    }, [])

    
    const { httpRequest } = useHttp();

    function addForecast(value){
        const new_forecast = [...forecast, value];

        new_forecast.sort((a, b)=> a.value - b.value);

        setForecast(new_forecast);
    }

    useLayoutEffect(() => {
        
        const configRequest = {
            method: "GET",
            url: `api/v1/forecasts?month=${timeFrame.month}&year=${timeFrame.year}`
        }


        function applyDate(res){

            if(res.status === 200){
                
                setForecast(res.data);
            }

        }
        

        (async()=>{
            await httpRequest(configRequest, applyDate);
        })();
        
        return ()=>{};

    }, [timeFrame])

    return(
        <>
            <div className="time_frame">
                <div>
                    <label>Months</label>
                    <select onChange={(e)=>setTimeFrame({...timeFrame, month: e.target.value})}
                            value={timeFrame.month}
                        >
                        <option value={0}>Choose Month</option>
                        {months.map((month, index)=><option key={index} value={month.value}>{month.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Year</label>

                    <select onChange={(e)=>setTimeFrame({...timeFrame, year: e.target.value})}
                        value={timeFrame.year}>
                        {years().map((year, index)=><option key={index} value={year.value}>{year.name}</option>)}
                    </select>
                </div>
            </div>
            <table>
                <ForecastTableHead/>
                <ForecastTableBody data={forecast} addForecast={addForecast}/>
            </table>
        </>
        
    )
}

export default ForecastTable;