import React, {useEffect, useState} from "react";
import useHttp from "../../hooks/useHttp";
import "../../css/dashboard/dashboard.css";
import ISPPannel from "./ISPPannel";


function Dashboard(){
    const [data, setData] = useState([]);
    const {httpRequest} = useHttp();
    useEffect(()=>{
        
        const requestConfig = {
            method: 'GET',
            url: 'api/v1/dashboard'
        }

        function applyData(res){
            
            if (res.status == 200){
                setData(res.data.data)
            }
        }

        httpRequest(requestConfig, applyData)

    },[])

    return(
        <div className="container">
            <div className="updated">
                Last Updated: 04/01/2024
            </div>

            {
                data.map((isp, index)=>{
                    return <ISPPannel key={index} data={isp}/>
                })
            }
        </div>
    )
}

export default Dashboard