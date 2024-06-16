import React from "react";
import TextField from "../../form/TextField";



function OpportunityName({name, value, inputChange}){

    return(
        <td>
            <TextField name={name} value={value} onChange={inputChange}/>
        </td>
    )
}

export default OpportunityName;