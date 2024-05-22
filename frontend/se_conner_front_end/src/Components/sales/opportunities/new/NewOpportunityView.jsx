import React, {useReducer} from "react";
import OpportunityForm from "./OpportunityForm";
import Header from "../../../header/Header";
import useSalesRep from "../../../../hooks/useSalesRep";
import "../../../../css/opportunity/new_opportunity.css";




function NewOpportunityView({}){
    const {initialState, opportunityReducer} = useSalesRep();
    const [opportunity, dispatchOpp] = useReducer(opportunityReducer, initialState)

    function inputChange(e){
        const {name, value} = e.target;
        
        dispatchOpp({type: name, payload: value})
    }

    return(
        <div className="opp_container">
            <Header/>
            <h1>Create New Opportunity</h1>
            <OpportunityForm
                opportunity={opportunity}
                inputChange={inputChange}
            />
        </div>
    )
}

export default NewOpportunityView;