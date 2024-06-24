import React from "react";
import TextField from "../../../form/TextField"



function ContactPhone({data, name, inputChange}){

    return(
        <td>
            <TextField name={name} value={data} onChange={inputChange}/>
        </td>
    )
}

export default ContactPhone;