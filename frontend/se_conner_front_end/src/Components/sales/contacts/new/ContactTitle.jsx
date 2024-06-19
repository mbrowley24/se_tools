import React from "react";
import TextField from "../../../form/TextField";



function ContactTitle({inputChange, value, errors}){
    return(
        <div className="">
            <TextField label={"Title"} name="title" value={value} onChange={inputChange} />
            <p className="error">{errors && errors.title? errors.first_name: ""}</p>
        </div>
    )
}
export default ContactTitle;