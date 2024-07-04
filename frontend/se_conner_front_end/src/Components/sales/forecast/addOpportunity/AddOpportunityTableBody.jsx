import React from "react";
import AddOpportunityTableRow from "./AddOpportunityTableRow";





function AddOpportunityTableBody({data, addOpportunity}){
    return(
        <tbody>
            {
                data.opportunities.content.map((item, index) => {
                    return(
                        <AddOpportunityTableRow key={index} 
                        data={item}
                        current_opps={data.current_opps}
                        addOpportunity={addOpportunity}
                        />
                    )
                })
            }
        </tbody>
    )
};

export default AddOpportunityTableBody;