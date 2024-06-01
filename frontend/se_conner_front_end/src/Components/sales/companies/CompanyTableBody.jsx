import React from "react";
import CompanyTableRow from "./CompanyTableRow";
import NewCompanyRow from "./NewCompanyRow";

function CompanyTableBody({data}){

    return(
        <tbody>
            {
                data.map((company, index) => {
                    return(
                        <CompanyTableRow key={index} data={company}/>
                    )
                })
            }
            {
                data.length === 0 && <tr><td colSpan="8">No companies found</td></tr>
            }
            <NewCompanyRow/>
        </tbody>
    )
}

export default CompanyTableBody;