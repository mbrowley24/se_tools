import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import Header from "../../../header/Header";
import CompanyDetails from "./CompanyDetails";
import useHttp from "../../../../hooks/useHttp";
import "../../../../css/table/table_form.css";
import {companyActions} from "../../../../store/company";


function CompanyView(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const company = useSelector(state => state.companyData.company);
    const {httpRequest} = useHttp();
    

    useEffect(()=>{

        if(!id) return;

        const configRequest = {
            url: `api/v1/companies/${id}`,
            method: 'GET',
        };
        
        function applyData(res){
            
            if(res.status === 200){
                dispatch(companyActions.setCompany(res.data));
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();

    },[]);

    return(
        <div>
            <Header/>
            <CompanyDetails data={company}/>
        </div>
    )
};
export default CompanyView;