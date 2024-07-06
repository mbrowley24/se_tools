import React from "react";
import OpportunityTableRow from "./OpportunityTableRow";



function OpportunityTableBody({data}){
    
    return(
        <tbody>
            { 
            data && data.length > 0?
                data.map((opportunity, index)=>{
                    return(
                        <OpportunityTableRow key={index} opportunity={opportunity}/>
                    )
            })
            :
                data && data.length === 0 &&
                        <tr><td colSpan="8">No data found</td></tr>
            }
        </tbody>
    )
}

export default OpportunityTableBody;