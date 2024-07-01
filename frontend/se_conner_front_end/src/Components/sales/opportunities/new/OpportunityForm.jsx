import React, {useMemo, useReducer} from "react";
import {useNavigate} from "react-router-dom";
import OpportunityName from "./OpportunityName";
import OpportunityAmount from "./OpportunityAmount";
import OpportunityClose from "./OpportunityClose";
import OpportunityStatus from "./OpportunityStatus";
import OpportunitySalesRep from "./OpportunitySalesRep";
import OpportunityDescription from "./OpportunityDescription";
import useHttp from "../../../../hooks/useHttp";


function OpportunityForm({id, inputChange, FIELDS, opportunity, errors, submit, submit_errors}){
    
    const navigate = useNavigate();
    
        return(
            <form onSubmit={submit}>
                <OpportunityName 
                    value={opportunity.name} 
                    inputChange={inputChange}
                    FIELDS={FIELDS}
                    errors={errors}
                    submit_errors={submit_errors}
                    />
                <OpportunityAmount 
                    value={opportunity.value} 
                    inputChange={inputChange}
                    FIELDS={FIELDS}
                    errors={errors}
                    submit_errors={submit_errors}
                    />
                <OpportunityClose
                    value={opportunity.close_date}
                    inputChange={inputChange}
                    FIELDS={FIELDS}
                    errors={errors}
                    submit_errors={submit_errors}
                />
                <OpportunityStatus
                    value={opportunity.status}
                    inputChange={inputChange}
                    FIELDS={FIELDS}
                    errors={errors}
                    submit_errors={submit_errors}
                />
                <OpportunitySalesRep
                    value={opportunity.sales_rep}
                    inputChange={inputChange}
                    FIELDS={FIELDS}
                    errors={errors}
                    submit_errors={submit_errors}
                />
                <OpportunityDescription
                    value={opportunity.description}
                    inputChange={inputChange}
                    FIELDS={FIELDS}
                    errors={errors}
                    submit_errors={submit_errors}
                />
                <div className="">
                    <button disabled={Object.keys(errors).length > 0}>Create Opportunity</button>
                    <button onClick={()=>navigate(`/sales/companies/${id}`)}>Cancel</button>
                </div>
            </form>
        )
}


export default OpportunityForm;