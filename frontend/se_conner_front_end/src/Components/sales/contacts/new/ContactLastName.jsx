import React from "react";
import TextField from "../../../form/TextField";





function ContactLastName({inputChange,value, errors}){
    return(
        <div className="">
            <TextField label={"Last Name"} name={"last_name"} value={value} onChange={inputChange} />
            <p className="error">{errors && errors.last_name? errors.last_name: ""}</p>
        </div>
    )
}

export default ContactLastName;