import React from "react";



function ContactTableHead({columns}){

    return(
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
        </thead>
    )
}


export default ContactTableHead;