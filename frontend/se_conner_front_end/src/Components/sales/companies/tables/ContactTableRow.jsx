import React from "react";
import TextField  from "../../../../"


function ContactTableRow({data}){

    function inputChange(e){

    }

    return(
        <tr>
            <td>
                <TextField name={"title"} value={data.title} onChange={inputChange}/>
            </td>
            <td>
                <TextField name={"first_name"} value={data.firstName} onChange={inputChange}/>
            </td>
            <td>
                <TextField name={"last_name"} value={data.lastName} onChange={inputChange}/>
            </td>
            <td>
                <TextField name={"email"} value={data.email} onChange={inputChange}/>
            </td>
            <td>
                <TextField name={"phone"} value={data.phone} onChange={inputChange}/>
            </td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    )
};

export default ContactTableRow;