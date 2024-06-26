import React, {useMemo, useState} from "react";

import OpportunitySalesRep from "../../opportunities/new/OpportunitySalesRep";
import NewForecastActions from "./NewForecastActions";
import useForecast from "../../../../hooks/useForecast";
import ForecastDateField from "./ForecastDateField";

function ForecastFormRow({addForecast}){
    const {checkForErrors} = useForecast();
    const [forecast, setForecast] = useState({
        start: "",
        end: "",
        sales_rep:""
    })
    const errors = useMemo(()=>checkForErrors(forecast), [forecast]);
    
    const reset = () => setForecast({ 
        start: "",
        end: "",
        sales_rep:""
    });

    function inputChange(e){
        const {name, value} = e.target;
        setForecast({...forecast, [name]: value});
    }

    return(
        <tr>
            <td></td>
            <ForecastDateField name={"start"} 
                                value={forecast.start} 
                                onChange={inputChange}
                                error={errors['start']}
                                />
            <ForecastDateField name={"end"} 
                                value={forecast.end} 
                                onChange={inputChange}
                                error={errors['end']}
                                />
            <td>
                <OpportunitySalesRep value={forecast.sales_rep}

                                    FIELDS={{SALESREP: "sales_rep"}} 
                                    inputChange={inputChange} />
                <p className="errors">{errors['sales_rep']}</p>
            </td>
            <NewForecastActions reset={reset} 
                                data={forecast}
                                addForecast={addForecast}
                                errors={errors}
                                />
        </tr>
    )
}

export default ForecastFormRow;