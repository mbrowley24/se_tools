import React from "react";



function CompanyNameCell({value, inputChange}){

    return(
        <td>
            <input type="text" value={value} onChange={(e)=>inputChange(e)} />
        </td>
    )
}

export default CompanyNameCell;