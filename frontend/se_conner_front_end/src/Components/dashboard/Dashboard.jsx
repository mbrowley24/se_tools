import React, {useEffect} from "react";
import useHttp from "../../hooks/useHttp";
import "../../css/dashboard/dashboard.css";
import "../../css/spinner.css"
import ISPPannel from "./ISPPannel";
import Header from "../header/Header";
import {useDispatch, useSelector} from "react-redux";
import { ispActions } from "../../store/ispStore";

function Dashboard(){
    const {httpRequest, isLoading} = useHttp();
    const dispatch = useDispatch();
    const data = useSelector(state=>state.ispData.dashboardData)
    useEffect(()=>{
        
        const requestConfig = {
            method: 'GET',
            url: 'api/v1/isp/dashboard'
        }

        function applyData(res){
            if (res.status == 200){
                dispatch(ispActions.addDashboardData(res.data))
            }
        }

        httpRequest(requestConfig, applyData)

    },[])

    return(
        <div className="container">
            <Header/>
            <div className="updated">
                Last Updated: 04/01/2024
            </div>
            
            {isLoading && data && data.length === 0 &&
                <div className="loader_conainer">
                    <div className="loader"></div>
                </div> 
            }
            {
                data.map((isp, index)=>{
    
                    return <ISPPannel key={index} data={isp}/>
                })
            }
        </div>
    )
}

export default Dashboard