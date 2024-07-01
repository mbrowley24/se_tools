import React, {useEffect, useState} from "react";
import useHttp from "../../../../hooks/useHttp";
import OpportunityTableHead from "./OpportunityTableHead";
import OpportunityTableBody from "./OpportunityTableBody";
import { companyActions } from "../../../../store/company";
import {useDispatch, useSelector} from "react-redux";

function OpportunityTable({}){
    const {httpRequest} = useHttp();    
    const dispatch = useDispatch();
    const companyData = useSelector(state => state.companyData);

    useEffect(()=>{

        if(companyData.opportunityStatus.length > 0) return;

        const config ={
            url: "api/v1/opportunities/status",
            method: "GET",
        }

        function applyData(res){
            
            //console.log(res)
            if(res.status === 200){
                
                dispatch(companyActions.setOpporunitiesStatus(res.data));
            }
        }

        (async()=>{
            
            await httpRequest(config, applyData);
            
        })()

    },[])
    
    return(
        <table>
            <OpportunityTableHead/>
            <OpportunityTableBody data={companyData.company.opportunities.content}/>
        </table>
    )
}
export default OpportunityTable;