import React from "react";
import ContactTableHead from "./ContactTableHead";
import ContactTableBody from "./ContactTableBody";



function ContactTable({}){
    return(
        <table>
            <ContactTableHead/>
            <ContactTableBody data={[]}/>
        </table>
    )
}

export default ContactTable;