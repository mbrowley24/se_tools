import React, {useState} from "react";
import SalesRepTableRow from "./SalesRepTableRow";
import NewSalesRepTableRow from "./NewSalesRepTableRow";




function TableBody({reps, deleteRep, setReset}){
    
    

    

    return(
        <tbody>
            {reps && reps.length > 0 && reps.map(rep => (
                <SalesRepTableRow rep={rep} key={rep.id} deleteRep={deleteRep}/>
            ))}
            {reps && reps.length === 0 && <tr><td colSpan="8">No Reps Found</td></tr>}
            <NewSalesRepTableRow setReset={setReset}/>
        </tbody>
    )
};
export default TableBody;