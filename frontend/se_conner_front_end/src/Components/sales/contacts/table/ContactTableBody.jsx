import React from "react";
import ContactTableRow from "./ContactTableRow";

function ContactsTableBody({data}){
    
    return(
        <tbody>
            {data.map((item) => {
                return(
                    <ContactTableRow key={item.id} data={item}/>
                )
            })}
            {data && data.length === 0 ? <tr><td colSpan="5">No Contacts Found</td></tr> : null}
        </tbody>
    )
}

export default ContactsTableBody;