import React from "react";
import TextField from "../../form/TextField";





function ServiceUrl({data, inputChange, errors}){
    return(
        <td>
            <TextField name={'url'} value={data} onChange={inputChange}/>
            {errors && errors.url && <p className="error">{errors.url}</p>}
        </td>
    )
}

export default ServiceUrl;