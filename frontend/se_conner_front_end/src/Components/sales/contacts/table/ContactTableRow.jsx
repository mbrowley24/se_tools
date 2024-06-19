import React from "react";
import ContactNameCell from "./ContactNameCell";
import ContactEmailCell from "./ContactEmailCell";
import ContactPhone from "./ContactPhone";




function ContactTableRow({data}){

    return(
        <tr>
            <ContactNameCell data={data}/>
            <ContactNameCell data={data}/>
            <ContactEmailCell data={data}/>
            <ContactPhone data={data}/>
        </tr>
    )
}

export default ContactTableRow;