import React from "react";



function OpportunityTableHead({columns}){

    return(
        <thead>
            <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Status</th>
                <th>Description</th>
                <th>Close Date</th>
            </tr>
        </thead>
    )
}

export default OpportunityTableHead;