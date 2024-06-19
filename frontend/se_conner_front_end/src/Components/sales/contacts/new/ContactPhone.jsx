import React from "react";
import TextField from "../../../form/TextField";




function ContactPhone({inputChange, value, errors}){
    return(
        <div>
            <TextField label={"Phone Number"} name={'phone'} value={value} onChange={inputChange} />
            <p className="error">{errors && errors.phone? errors.phone: ""}</p>
        </div>
    )
}

export default ContactPhone;