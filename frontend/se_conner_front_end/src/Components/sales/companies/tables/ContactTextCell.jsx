import React from "react";
import TextField from "../../../form/TextField";



function ContactTextCell({data, inputChange, name}){

    return(
        <td>
            <TextField onChange={inputChange} value={data.name} name={name} />
        </td>
    )
}

export default ContactTextCell;