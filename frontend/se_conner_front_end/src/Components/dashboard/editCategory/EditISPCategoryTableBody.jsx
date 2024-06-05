import React from "react";
import EditISPCategoryTableRow from "./EditISPCategoryTableRow";
import NewCategoryRow from "./NewCategoryRow";



function EditISPCategoryTableBody({data,id}){
    
    return(
        <tbody>
            {data.length > 0 && data.map((category, index)=>{
                
                return(
                    <EditISPCategoryTableRow key={index} data={category} id={id} />
                )
                
            })
            }

            {
                data.length === 0 && 
                <tr>
                    <td colSpan="4">No data found</td>
                </tr>
            }
            <NewCategoryRow id={id} />
        </tbody>
    )
}

export default EditISPCategoryTableBody;