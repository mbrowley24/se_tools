import React from "react";
import SalesRepTableRow from "./SalesRepTableRow";
import NewSalesRepTableRow from "./NewSalesRepTableRow";




function TableBody({reps}){
    
    return(
        <tbody>
            {reps.length > 0 && reps.map(rep => (
                <SalesRepTableRow rep={rep} key={rep.id}/>
            ))}
            {reps && reps.length === 0 && <tr><td colSpan="8">No Reps Found</td></tr>}
            <NewSalesRepTableRow/>
        </tbody>
    )
};
export default TableBody;