import React, {useEffect, useReducer} from "react";
import {Link} from "react-router-dom"
import Header from "../header/Header.jsx";
import SalesRepTableHeader from "./SalesRepTableHeader.jsx";
import SalesRepTableBody from "./SalesRepTableBody.jsx";
import useSalesRep from "../../hooks/useSalesRep.jsx";
import useHttp from "../../hooks/useHttp.jsx";
import "../../css/table/table.css";


function SalesReps(){
    const {httpRequest} = useHttp();
    const {salesRepReducer, salesRepInitialState} = useSalesRep();
    const [state, dispatch] = useReducer(salesRepReducer, salesRepInitialState);

    useEffect(() => {

        const configRequest = {
            method: "GET",
            url: "sales_reps",
        }

        function applyData(res){

            if(res.status === 200){
                dispatch({type: 'sales_reps', payload: res.data})
            }

        }

        httpRequest(configRequest, applyData);

    },[])

    return (
        <div>
            <Header/>
            <div className={'container'}>
                <h1>Sales Representatives</h1>
                <div className={'links'}>
                    <Link to={'/sales_reps/new'}>Create Rep</Link>
                </div>
                <table>
                    <SalesRepTableHeader/>
                    <SalesRepTableBody sales_reps={state.sales_reps}/>
                </table>
            </div>
        </div>
    )
}


export default SalesReps