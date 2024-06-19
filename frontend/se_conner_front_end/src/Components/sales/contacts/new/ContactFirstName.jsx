import React from "react";
import TextField from "../../../form/TextField";





function ContactFirstName({inputChange, value, errors}){
    
    return(
        <div className="">
            <TextField label={"First Name"} name={"first_name"} value={value} onChange={inputChange} />
            <p className="error">{errors && errors.first_name? errors.first_name: ""}</p>
        </div>
    )
}

export default ContactFirstName;