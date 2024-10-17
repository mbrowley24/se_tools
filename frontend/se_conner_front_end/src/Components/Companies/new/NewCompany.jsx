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

    console.log(state);

    useEffect(() => {

        const configRequest = {
            method: 'GET',
            data : JSON.parse(JSON.stringify(state.company)),
        }

        function applyData(res){
            console.log(res);
        }

        httpRequest(configRequest, applyData).then((res)=>{
            console.log(res)
        }).catch((error) =>{
            console.log(error)
        })

    },[])

    return(
        <div>
            <Header/>
            <div className={"form_container_body"}>
                <h1>New Company</h1>
                <CompanyForm state={state} dispatch={dispatch}/>
            </div>
        </div>
    )
}


export default NewCompany;