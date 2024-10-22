import React from 'react';
import useGeneral from "../../hooks/useGeneral.jsx";
import CompanyAction from "./new/CompanyAction.jsx";



function CompanyTableBody({companies}) {
    const {formatDate} = useGeneral();
    return (
        <tbody>
        {
            companies && companies.map((company)=>{
                return (
                    <tr key={company.id}>
                        <td>{company.name}</td>
                        <td>{company.industry.name}</td>
                        <td>{company.sales_rep.name}</td>
                        <td>{company.created_by.name}</td>
                        <td>{formatDate(company.updated_at)}</td>
                        <CompanyAction id={company.id} />
                    </tr>
                )
            })
        }
        </tbody>
    )
}

export default CompanyTableBody;