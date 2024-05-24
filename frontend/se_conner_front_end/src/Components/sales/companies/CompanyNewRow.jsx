import React from "react";


function CompanyNewRow(){
    return(
        <tr>
            <td><input type="text" placeholder="Name"/></td>
            <td><input type="text" placeholder="Location"/></td>
            <td><input type="text" placeholder="Industry"/></td>
            <td><input type="text" placeholder="Revenue"/></td>
            <td><input type="text" placeholder="Employees"/></td>
            <td><input type="text" placeholder="Notes"/></td>
            <td><button>Save</button></td>
        </tr>
    )
}