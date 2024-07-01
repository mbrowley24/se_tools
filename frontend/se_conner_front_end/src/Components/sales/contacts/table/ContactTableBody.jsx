import React from "react";
import ContactTableRow from "./ContactTableRow";

function ContactsTableBody({data, id}){
    
    return(
        <tbody>
            {data.map((item) => {
                return(
                    <ContactTableRow key={item.id} data={item} id={id}/>
                )
            })}
            {data && data.length === 0 ? <tr><td colSpan="6">No Contacts Found</td></tr> : null}
        </tbody>
    )
}

export default ContactsTableBody;