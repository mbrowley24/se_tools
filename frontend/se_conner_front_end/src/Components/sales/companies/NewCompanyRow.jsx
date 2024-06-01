import React from "react";
import CompanyNameCell from "./CompanyNameCell";




function NewCompanyRow({company, setCompany, setReset, reset}){
    

    return(
        <tr>
            <td colSpan={'5'}></td>
            <CompanyNameCell/>
        </tr>
    )
}

export default NewCompanyRow;