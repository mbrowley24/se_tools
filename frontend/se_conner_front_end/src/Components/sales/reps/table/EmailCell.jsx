import React from "react";
import TextField from "../../../form/TextField";


function EmailCell({value, inputChange, name, errors, edit}){
        
    return(
        <td>
            {
                edit?
                    <>
                        <TextField name={name} value={value} onChange={inputChange}/>
                        {errors && <p className="errors">{errors? errors : ""}</p>}
                    </>
                :
                value
            }
            
        </td>
    )
}

export default EmailCell;