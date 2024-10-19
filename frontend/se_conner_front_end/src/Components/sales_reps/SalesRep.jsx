import React from 'react';





function SalesRep({sales_rep}) {

    return (
        <tr>
            <td>{sales_rep.name}</td>
            <td>{sales_rep.role}</td>
            <td>{sales_rep.sales_engineer}</td>
        </tr>
    )
}

export default SalesRep;