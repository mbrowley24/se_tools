import React, { useEffect, useReducer } from "react";
import Header from "../../header/Header.jsx";
import SalesRepForm from "../SalesRepForm.jsx";
import useSalesRep from "../../../hooks/useSalesRep.jsx";
import useHttp from "../../../hooks/useHttp.jsx";
import '../../../css/form/form_med.css'



function NewSalesRep({}) {
    const {httpRequest} = useHttp()
    const {salesRepInitialState, salesRepReducer} = useSalesRep();
    const [state, dispatch] = useReducer(salesRepReducer, salesRepInitialState);

    useEffect(()=>{

        const configRequest = {
            method: "GET",
            url: 'sales_roles',
        }

        function applyData(res){
            console.log(res)
            dispatch({type: 'roles',  payload: res.data.roles})
        }

        httpRequest(configRequest, applyData);

    },[])

    return (
        <div>
            <Header/>
            <div className={'form_container_body'}>
                <h1>New Sales Rep</h1>
                <SalesRepForm state={state} dispatch={dispatch}/>
            </div>
        </div>
    )
}

export default NewSalesRep;