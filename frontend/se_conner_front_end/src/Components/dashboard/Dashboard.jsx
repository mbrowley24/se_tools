import React, {useEffect} from "react";
import useHttp from "../../hooks/useHttp";


function Dashboard(){
    const {httpRequest} = useHttp();
    useEffect(()=>{
        
        const requestConfig = {
            method: 'GET',
            url: 'api/v1/dashboard'
        }

        function applyData(res){
            console.log(res)
        }

        httpRequest(requestConfig, applyData)

    },[])

    return(
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard