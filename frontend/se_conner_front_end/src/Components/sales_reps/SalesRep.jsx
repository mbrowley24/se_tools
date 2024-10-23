import React from 'react';
import useGeneral from "../../hooks/useGeneral.jsx";
import EmailLink from "../form/EmailLink.jsx";



function SalesRep({sales_rep}) {
    const {formatDate} = useGeneral();

    return (
        <tr>
            <td>{`${sales_rep.first_name} ${sales_rep.last_name}`}</td>
            <td>{sales_rep.role}</td>
            <td><EmailLink email={sales_rep.email}/></td>
            <td>{formatDate(sales_rep.updated_at)}</td>
        </tr>
    )
}

export default SalesRep;