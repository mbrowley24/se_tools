import React, {useEffect, useReducer} from "react";
import Header from "../header/Header.jsx";
import SalesRepTableHeader from "./SalesRepTableHeader.jsx";
import SalesRepTableBody from "./SalesRepTableBody.jsx";
import useSalesRep from "../../hooks/useSalesRep.jsx";
import useHttp from "../../hooks/useHttp.jsx";


function SalesReps(){
    const {httpRequest} = useHttp();
    const {salesRepReducer, salesRepInitialState} = useSalesRep();
    const [state, dispatch] = useReducer(salesRepReducer, salesRepInitialState);

    useEffect(() => {

        const configRequest = {
            method: "GET",
            url: "/sales_reps",
        }


        function actionApply(res){
            console.log(res);
        }

        httpRequest(configRequest, actionApply);

    },[])

    return (
        <div>
            <Header/>
            <h1>Sales Representatives</h1>
            <div>
                <table>
                    <SalesRepTableHeader/>
                    <SalesRepTableBody sales_reps={state.sales_reps}/>
                </table>
            </div>
        </div>
    )
}


export default SalesReps