import React from "react";
import TextField from "../../../form/TextField";


function  ContactNameCell({name, inputChange, data}){

    return(
        <td>
            <TextField name={name} value={data} onChange={inputChange}/>
        </td>
    )
}

export default ContactNameCell;