import React from "react";
import ContactTableHead from "./ContactTableHead";
import ContactTableBody from "./ContactTableBody";



function ContactTable({data}){
    console.log(data);
    return(
        <table>
            <ContactTableHead/>
            <ContactTableBody data={data}/>
        </table>
    )
}

export default ContactTable;