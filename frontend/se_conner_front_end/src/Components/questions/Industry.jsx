import React, {useEffect, useState} from "react";
import useHttp from "../../hooks/useHttp";
import Select from "../form/Select";



function Industry({value, onChange, name}){
    const [industry, setIndustry] = useState([]);
    const {httpRequest} = useHttp();

    
    useEffect(()=>{

        const controller = new AbortController();

        const requestConfig = {
            url: "/api/v1/industry",
            method: "GET",
            signal: controller.signal
        }

        function applyData(res){
            if(res.data.data){
                setIndustry(res.data.data);
            }
        }

        (async()=>{
            await httpRequest(requestConfig, applyData);
        })()

        return ()=>{
            controller.abort();
        }

    },[])

    return(
        <div>
            <Select
                multiple={true}
                value={value} 
                options={industry}
                name={name}
                onChange={onChange}
                />
        </div>
    )
}
export default Industry;