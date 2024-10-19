import React, {useEffect, useReducer} from 'react';
import useCompany from "../../../hooks/useCompany.jsx";
import useHttp from '../../../hooks/useHttp.jsx';
import Header from "../../header/Header.jsx";
import CompanyForm from "./CompanyForm.jsx";
import '../../../css/form/form.css'




function NewCompany({}) {
    const {httpRequest} = useHttp()
    const {companyReducer, initialCompanyState} = useCompany()
    const [state, dispatch]  = useReducer(companyReducer, initialCompanyState);


    useEffect(() => {

        const configRequest = {
            method: 'GET',
            url : 'companies/new',
            data : JSON.parse(JSON.stringify(state.company)),
        }

        function applyData(res){
            console.log(res)
            dispatch({type: 'form_data', payload: res.data})
        }

        httpRequest(configRequest, applyData)

    },[])


    function submit(e){
        e.preventDefault()

        const configRequest ={
            method: 'POST',
            url : 'companies/new',
            data : state.company,
        }

        function applyData(res){
            console.log(res)
        }

        httpRequest(configRequest, applyData);
    }

    return(
        <div>
            <Header/>
            <div className={"form_container_body"}>
                <h1>New Company</h1>
                <CompanyForm state={state} dispatch={dispatch} submit={submit} />
            </div>
        </div>
    )
}


export default NewCompany;