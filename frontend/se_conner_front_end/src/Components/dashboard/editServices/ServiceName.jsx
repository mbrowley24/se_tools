import React from "react";
import TextField from "../../form/TextField";



function ServiceName({data, inputChange, errors}){
    return(
        <td>
            <TextField name={'name'} value={data} onChange={inputChange}/>
            {errors && errors.name && <p className="error">{errors.name}</p>}
        </td>
    )
}


export default ServiceName;