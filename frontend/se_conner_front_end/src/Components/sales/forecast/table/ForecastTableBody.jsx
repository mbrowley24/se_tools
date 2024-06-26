import React from "react";
import ForecastTableRow from "./ForecastTableRow";
import ForecastFormRow from "./ForecastFormRow";

function ForecastTableBody({addForecast, data}){

    return(
        <tbody>
            {
                data.map((item) => {

                    return(
                        <ForecastTableRow key={item.id} data={item}/>
                    )
                })
            }
            {
                data.length === 0 && 
                <tr>
                    <td colSpan={'5'} className="not_items">Forecast Not Found</td>
                </tr>
            }
            <ForecastFormRow addForecast={addForecast}/>
        </tbody>
    )
}

export default ForecastTableBody;