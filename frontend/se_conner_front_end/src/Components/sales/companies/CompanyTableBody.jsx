import React from "react";
import CompanyTableRow from "./CompanyTableRow";
import NewCompanyRow from "./NewCompanyRow";

function CompanyTableBody({data}){

    return(
        <tbody>
            {
                data && data.companies.map((company, index) => {
                    return(
                        <CompanyTableRow key={index} data={company}/>
                    )
                })
            }
            {
                data && data.companies.length === 0 && <tr><td colSpan="8">No companies found</td></tr>
            }
            <NewCompanyRow data={data.newCompany} errors={data.errors}/>
        </tbody>
    )
}

export default CompanyTableBody;