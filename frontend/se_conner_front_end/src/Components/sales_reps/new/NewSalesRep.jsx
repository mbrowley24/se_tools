import React, { useEffect, useReducer } from "react";
import Header from "../../header/Header.jsx";
import {useNavigate} from 'react-router-dom'
import SalesRepForm from "../SalesRepForm.jsx";
import useSalesRep from "../../../hooks/useSalesRep.jsx";
import useHttp from "../../../hooks/useHttp.jsx";
import '../../../css/form/form_med.css'




function NewSalesRep({}) {
    const {httpRequest} = useHttp();
    const navigate = useNavigate();
    const {normalizeData, salesRepInitialState, salesRepReducer} = useSalesRep();
    const [state, dispatch] = useReducer(salesRepReducer, salesRepInitialState);

    useEffect(()=>{

        const configRequest = {
            method: "GET",
            url: 'sales_roles',
        }

        function applyData(res){

            dispatch({type: 'roles',  payload: res.data.roles})
        }

        httpRequest(configRequest, applyData);

    },[])

    useEffect(() => {

        const configRequest = {
            method: "GET",
            url: 'csrf_token',
        }

        function applyData(res){

            dispatch({type: 'csrf', payload : res.data})
        }

        httpRequest(configRequest, applyData);
    }, [])


    function submit(e){
        e.preventDefault()

        const configRequest = {
            url : 'sales_reps',
            method: "POST",
            data: normalizeData(state.sales_rep)
        }

        function applyData(res){

            if (res.status === 200){

                navigate('/dashboard');
            }
            console.log(res)
        }

        httpRequest(configRequest, applyData)

    }

    return (
        <div>
            <Header/>
            <div className={'form_container_body'}>
                <h1>New Sales Rep</h1>
                <SalesRepForm submit={submit} state={state} dispatch={dispatch}/>
            </div>
        </div>
    )
}

export default NewSalesRep;