import React, {useEffect, useState } from "react";
import CompanyTableHead from "./CompanyTableHead";
import CompanyTableBody from "./CompanyTableBody";
import useHttp from "../../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../../store/company";

function CompanyTable(){
    const dispatch = useDispatch();
    const data = useSelector(state => state.companyData);
    const {httpRequest} = useHttp();    
    
    useEffect(() => {
        const configRequest = {
            url: "api/v1/companies",
            method: "GET"
        }

        function applyData(res){
            if(res.status === 200){
                dispatch(companyActions.setCompanies(res.data));
            }
        }

        (async() =>{
            await httpRequest(configRequest, applyData);
        })()

    }, []);
    
    return(
        <table>
            <CompanyTableHead/>
            <CompanyTableBody data={data}/>
        </table>
    )
}

export default CompanyTable;