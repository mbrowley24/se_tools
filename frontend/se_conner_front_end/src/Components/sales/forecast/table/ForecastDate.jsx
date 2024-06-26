import React from "react";
import TextField from "../../../form/TextField";



function ForecastDate({value, onChange, name, label}){

    return(
        <div>
            {label && <label>{label}</label>}
            <TextField type={'date'} name={name} value={value} onChange={onChange}/>
        </div>
    )
}

export default ForecastDate;