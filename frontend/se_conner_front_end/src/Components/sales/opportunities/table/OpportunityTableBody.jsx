import React from "react";
import OpportunityTableRow from "./OpportunityTableRow";



function OpportunityTableBody({opportunities}){
    return(
        <tbody>
            { 
            opportunities && opportunities.content.length > 0?
                opportunities.content.map((opportunity, index)=>{
                    return(
                        <OpportunityTableRow key={index} opportunity={opportunity}/>
                    )
            })
            :
                opportunities && opportunities.content.length === 0 &&
                        <tr><td colSpan="7">No opportunities found</td></tr>
            }
        </tbody>
    )
}

export default OpportunityTableBody;