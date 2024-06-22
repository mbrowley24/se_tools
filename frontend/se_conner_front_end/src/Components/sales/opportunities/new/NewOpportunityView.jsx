import React, {useMemo, useReducer, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";
import OpportunityForm from "./OpportunityForm";
import Header from "../../../header/Header";
import useOpportunity from "../../../../hooks/useOpportunity";
import "../../../../css/opportunity/new_opportunity.css";
import useHttp from "../../../../hooks/useHttp";



function NewOpportunityView({}){
    const {id} = useParams();
    const navigate = useNavigate();
    const {FIELDS, initialState, opportunityReducer, checkForErrors} = useOpportunity();
    const [opportunity, dispatchOpp] = useReducer(opportunityReducer, initialState);
    const {httpRequest} = useHttp();
    const errors = useMemo(()=> checkForErrors(opportunity), [opportunity]);
    const [submit_errors, setSubmitErrors] = useState({});


    function inputChange(e){
        const {name, value} = e.target;
        
        dispatchOpp({type: name, payload: value})
    }



    function submit(e){
        e.preventDefault();

        const configRequest = {
            url: `api/v1/companies/${id}`,
            method: "POST",
            data: opportunity
        }

        function applyData(res){
            console.log(res)
            if(res.status === 200){
                
                dispatchOpp({type: FIELDS.RESET, payload: null})
                navigate(`/sales/companies/${id}`)
            
            }else{
                
                if(res.response.data.errors){
                    setSubmitErrors(res.response.data.errors)
                }
            }

        }

        (async () => {

            httpRequest(configRequest, applyData);

        })()

    }


    return(
        <div className="opp_container">
            <Header/>
            <h1>Create New Opportunity</h1>
            <OpportunityForm
                id={id}
                inputChange={inputChange}
                errors={errors}
                submit_errors={submit_errors}
                FIELDS={FIELDS}
                opportunity={opportunity}
                submit={submit}
            />
        </div>
    )
}

export default NewOpportunityView;