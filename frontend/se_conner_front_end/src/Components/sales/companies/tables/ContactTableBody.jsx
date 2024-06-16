import React from "react";
import ContactTableRow from "./ContactTableRow";

function ContactTableBody({data}){

    return(
        <tbody>
            {data.map((contact, index) => (
                <ContactTableRow key={contact.id} data={contact}/>
            ))}
        </tbody>
    )
};
export default ContactTableBody;