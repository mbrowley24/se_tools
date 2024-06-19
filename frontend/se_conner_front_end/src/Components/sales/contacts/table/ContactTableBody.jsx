import React from "react";
import ContactTableRow from "./ContactTableRow";

function ContactsTableBody({data}){
    console.log(data);
    return(
        <tbody>
            {data.map((item) => {
                return(
                    <ContactTableRow key={item.id} data={item}/>
                )
            })}
        </tbody>
    )
}

export default ContactsTableBody;