import React from "react";



function EditISPCategoryTableBody({data}){
    return(
        <tbody>
            {data.map((service, index)=>{
                return <tr key={index}>
                    <td>{service.name}</td>
                    <td>{service.link}</td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
            })}
        </tbody>
    )
}

export default EditISPCategoryTableBody;