import React from "react";
import CompanyTableRow from "./CompanyTableRow";

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
        </tbody>
    )
}

export default CompanyTableBody;