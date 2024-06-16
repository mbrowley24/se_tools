import React from "react";
import OpportunityName from "./OpportunityName";
import OpportunityTableRow from "../../sales/opportunities/table/OpportunityTableRow";



function OpportunityTableBody({data}){
    return(
        <tbody>
            {data.map((item) => {
                return(
                    <OpportunityTableRow key={item.id} data={item}/>
                )
            })}
        </tbody>
    )
}

export default OpportunityTableBody;