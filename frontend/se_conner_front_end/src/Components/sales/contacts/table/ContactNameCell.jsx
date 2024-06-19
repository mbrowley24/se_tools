import React from "react";
import TextField from "../../../form/TextField";


function  ContactNameCell({name, inputChange, value}){

    return(
        <td>
            <TextField name={name} value={value} onChange={inputChange}/>
        </td>
    )
}

export default ContactNameCell;