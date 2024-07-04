import React from "react";
import ForecastTableRow from "./ForecastTableRow";
import ForecastFormRow from "./ForecastFormRow";

function ForecastTableBody({data, dispatch}){
    
    return(
        <tbody>
            {
                data.map((item) => {
                        
                    return(
                        <ForecastTableRow key={item.id} data={item} dispatch={dispatch}/>
                    )
                })
            }
            {
                data.length === 0 && 
                <tr>
                    <td colSpan={'6'} className="not_items">Forecast Not Found</td>
                </tr>
            }
            <ForecastFormRow dispatch={dispatch}/>
        </tbody>
    )
}

export default ForecastTableBody;