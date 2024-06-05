import React from "react";
import TextField from "../../form/TextField";



function URLField({data, inputChange, errors, name}){
    

    return(
        <td>
            <TextField type={'text'} name={name} value={data} onChange={inputChange} />
            {errors && errors.url && <p className="errors">{errors.url}</p>}
        </td>
    )
}

export default URLField;