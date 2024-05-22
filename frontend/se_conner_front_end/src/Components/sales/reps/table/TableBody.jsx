import React from "react";
import useSalesRep from "../../../../hooks/useSalesRep";



function TableBody({reps}){
    const {addCommas, phoneNumberFormat} = useSalesRep();
    
    return(
        <tbody>
            {reps && reps.length > 0 && reps.map(rep => (
                <tr key={rep.id}>
                    <td>{rep.name}</td>
                    <td>${addCommas(rep.quota)}</td>
                    <td>{rep.email}</td>
                    <td>{phoneNumberFormat(rep.phone)}</td>
                    <td>{rep.role}</td>
                    <td>{rep.sales_engineer}</td>
                </tr>
            ))}
            {reps && reps.length === 0 && <tr><td colSpan="7">No Reps Found</td></tr>}
        </tbody>
    )
};
export default TableBody;