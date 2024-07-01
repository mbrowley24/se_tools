import React from "react";
import ContactTableHead from "./ContactTableHead";
import ContactTableBody from "./ContactTableBody";



function ContactTable({data, id}){
    console.log(data);
    return(
        <table>
            <ContactTableHead/>
            <ContactTableBody data={data} id={id}/>
        </table>
    )
}

export default ContactTable;