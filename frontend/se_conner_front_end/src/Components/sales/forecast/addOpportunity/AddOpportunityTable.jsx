import React from "react";
import AddOpportunityTableHead from "./AddOpportunityTableHead";
import AddOpportunityTableBody from "./AddOpportunityTableBody";

function AddOpportunityTable({data, addOpportunity}){
    return(
        <table>
            <AddOpportunityTableHead/>
            <AddOpportunityTableBody data={data} 
                addOpportunity={addOpportunity}/>
        </table>
    )
};

export default AddOpportunityTable;