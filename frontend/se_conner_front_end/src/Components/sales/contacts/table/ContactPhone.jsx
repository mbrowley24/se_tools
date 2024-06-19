import React from "react";
import TextField from "../../../form/TextField"



function ContactPhone({data, name, inputChange, value}){

    return(
        <td>
            <TextField name={name} value={value} onChange={inputChange}/>
        </td>
    )
}

export default ContactPhone;