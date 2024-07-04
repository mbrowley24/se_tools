import React, {useEffect, useMemo, useState} from "react";
import useTextTransform from "../../../../hooks/useTextTransform";
import ForecastDateField from "./ForecastDateField";
import OpportunitySalesRep from "../../opportunities/new/OpportunitySalesRep";
import ForecastActions from "./ForecastActions";
import useForecast from "../../../../hooks/useForecast";
import { Link } from "react-router-dom";

function ForecastTableRow({data, dispatch}){

    const [edit, setEdit] = useState(false);
    const [forecast, setForecast] = useState({
        id: "",
        start: "",
        end: "",
        sales_rep:{
            value: "",
            name: ""
        }
    })
    const {checkForErrorsEdit, checkForChanges} = useForecast();
    const {capitalizeName} = useTextTransform();
    const errors = useMemo(()=>checkForErrorsEdit(forecast), [forecast]);
    const editToogle = () => setEdit(!edit);
    const change = useMemo(()=>checkForChanges(data, forecast), [data, forecast]);
    

    function inputChange(e){
        
        const {name, value} = e.target;

        const new_forecast = {...forecast};
        
        if(name === "sales_rep"){
            
            new_forecast.sales_rep.value = value;
        
        }else{

            new_forecast[name] = value;
        }

        setForecast(new_forecast);

    }

    useEffect(()=>{

        if(!data) return

        setForecast({
            id: data.id,
            start: data.start,
            end: data.end,
            sales_rep:{
                value: data.sales_rep.value,
                name: data.sales_rep.name
            }        
        })
        
    }, [data, edit]);

    return(
        <tr>
            <td>
                {`$ ${data.value}`}
            </td>
            {edit ? 
                <ForecastDateField name={"start"} 
                        value={forecast.start} 
                        onChange={inputChange}
                        error={errors['start']} />
                : 
                <td>
                    {forecast.start}
                </td>
            }
            {edit ? 
                <ForecastDateField name={"end"} 
                        value={forecast.end} 
                        onChange={inputChange}
                        error={errors['end']}
                        />
                :
                <td>
                    {forecast.end}
                </td>
            }
            <td>
                {edit ? 
                    <OpportunitySalesRep value={forecast.sales_rep.value}
                            FIELDS={{SALESREP: "sales_rep"}} 
                            inputChange={inputChange} 
                            errors={errors}
                            />
                        : 
                    
                        forecast.sales_rep.name && capitalizeName(forecast.sales_rep.name)
                    
                }
            </td>
            <td>
                <Link to={`/sales/forecast/${data.id}/${data.sales_rep.value}`}>{data.opportunities}</Link>
            </td>
            <ForecastActions
                            data={forecast}
                            edit={edit} 
                            change={change}
                            toogle={editToogle}
                            errors={errors}
                            dispatch={dispatch}
                            />
        </tr>
    )
}
export default ForecastTableRow;