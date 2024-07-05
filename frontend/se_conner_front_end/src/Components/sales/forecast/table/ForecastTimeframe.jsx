import React from "react";




function ForecastTimeframe({data, dispatch, months, years}){

    return(
        <div className="time_frame">
            <div>
                <label>Months</label>
                <select onChange={(e)=>dispatch({type: "set_month", payload: e.target.value})}
                        value={data.forecast.time_frame.month}
                    >
                    <option value={0}>Choose Month</option>
                    {months.map((month, index)=><option key={index} value={month.value}>{month.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="">Year</label>
                <select onChange={(e)=>dispatch({type: "set_year", payload: e.target.value})}
                    value={data.forecast.time_frame.year}>
                    {years().map((year, index)=><option key={index} value={year.value}>{year.name}</option>)}
                </select>
            </div>
        </div>
    )
}

export default ForecastTimeframe;