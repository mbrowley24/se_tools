




function CompanyTableBody({companies}) {

    return (
        <tbody>
        {
            companies && companies.map((company)=>{
                return (
                    <tr key={company.id}>
                        <td>{company.name}</td>
                        <td>{company.industry}</td>
                        <td>{company.sales_engineer}</td>
                        <td>{company.coverage_se}</td>
                        <td>{company.sales_rep}</td>
                        <td>{company.created_by}</td>
                        <td>{company.updated_at}</td>
                    </tr>
                )
            })
        }
        </tbody>
    )
}

export default CompanyTableBody;