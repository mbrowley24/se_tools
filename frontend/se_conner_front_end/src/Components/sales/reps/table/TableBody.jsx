import React from "react";
import SalesRepTableRow from "./SalesRepTableRow";
import NewSalesRepTableRow from "./NewSalesRepTableRow";




function TableBody({reps}){
    
    return(
        <tbody>
            {reps.map((rep, index) => (
                <SalesRepTableRow rep={rep} key={index}/>
            ))}
            {reps && reps.length === 0 && <tr><td colSpan="8">No Reps Found</td></tr>}
            <NewSalesRepTableRow/>
        </tbody>
    )
};
export default TableBody;