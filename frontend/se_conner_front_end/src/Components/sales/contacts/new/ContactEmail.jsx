import React from "react";
import TextField from "../../../form/TextField";





function ContactEmail({inputChange, value, errors}){
    
    return(
        <div>
            <TextField label={"Email"} name={'email'} value={value} onChange={inputChange}/>
            <p className="error">{errors && errors.email? errors.email: ""}</p>
        </div>
    )
}

export default ContactEmail;