import React from "react";
import TextField from "../../../form/TextField";

function ForecastDateField({name, value, onChange, error}){
    return(
        <td>
            <TextField type={"date"}
                name={name}
                value={value} 
                onChange={onChange}
            />
            <p className="errors">{error? error : ""}</p>
        </td>
    )
}

export default ForecastDateField;