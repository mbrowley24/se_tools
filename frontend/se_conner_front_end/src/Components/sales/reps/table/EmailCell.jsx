import React from "react";
import TextField from "../../../form/TextField";


function EmailCell({value, inputChange, name, errors}){
        
    return(
        <td>
            <TextField name={name} value={value} onChange={inputChange}/>
            {errors && <p className="errors">{errors? errors : ""}</p>}
        </td>
    )
}

export default EmailCell;