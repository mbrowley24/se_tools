import React, {useEffect, useState} from "react";
import useHttp from "../../../hooks/useHttp";
import Select from "../../form/Select";



function Industry({value, onChange, name, error}){
    const [industry, setIndustry] = useState([]);
    const {httpRequest} = useHttp();

    
    useEffect(()=>{

        const controller = new AbortController();

        const requestConfig = {
            url: "/api/v1/industries",
            method: "GET",
            signal: controller.signal
        }

        function applyData(res){
            if(res.status === 200){
                setIndustry(res.data);
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
            <label htmlFor="">Industries</label>
            <Select
                multiple={true}
                value={value} 
                options={industry}
                name={name}
                onChange={onChange}
                />
            <p className="error">{error? error : ""}</p>
        </div>
    )
}
export default Industry;