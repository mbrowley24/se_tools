import React, {useEffect, useMemo, useReducer, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";
import OpportunityForm from "./OpportunityForm";
import Header from "../../../header/Header";
import useOpportunity from "../../../../hooks/useOpportunity";
import "../../../../css/opportunity/new_opportunity.css";
import useHttp from "../../../../hooks/useHttp";



function NewOpportunityView({}){
    const {id} = useParams();
    const navigate = useNavigate();
    const [oppLimit, setOppLimit] = useState(false);
    const {FIELDS, initialState, opportunityReducer, checkForErrors} = useOpportunity();
    const [opportunity, dispatchOpp] = useReducer(opportunityReducer, initialState);
    const {httpRequest} = useHttp();
    const errors = useMemo(()=> checkForErrors(opportunity, oppLimit), [opportunity, oppLimit]);
    const [submit_errors, setSubmitErrors] = useState({});

    const setOppLimitError = (data) => setOppLimit(data);

    function inputChange(e){
        const {name, value} = e.target;
        
        dispatchOpp({type: name, payload: value})
    }

    useEffect(()=>{

        const configRequest = {
            url: `api/v1/companies/${id}/contacts/limit`,
            method: "GET"
        }

        function applyData(res){
            console.log(res)
            if(res.status === 200){

                setOppLimitError(res.data)
            }
        }

        const checkOppLimit = setTimeout(() => {
                (async () => {
                    await httpRequest(configRequest, applyData);
                })();   

        }, 250);

        

        return () => {
            clearTimeout(checkOppLimit);
        }

    },[opportunity.sales_rep])


    function submit(e){
        e.preventDefault();

        const configRequest = {
            url: `api/v1/companies/${id}/new/opportunity`,
            method: "POST",
            data: opportunity
        }

        function applyData(res){
            
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