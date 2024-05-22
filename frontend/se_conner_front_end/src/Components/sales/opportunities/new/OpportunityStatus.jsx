import React, {useEffect, useMemo, useState} from "react";
import useHttp from "../../../../hooks/useHttp";
import useSalesRep from "../../../../hooks/useSalesRep";


function OpportunityStatus({value, inputChange, isValid}){
    const [status, setStatus] = useState([]);
    const {httpRequest} = useHttp();
    const {FIELDS} = useSalesRep();

    const valid = useMemo(()=>{
        const statusList = [...status]
        return statusList.filter(stat=>stat.value === value).length > 0; 
    }, [value])

    useEffect(()=>{    
        isValid(FIELDS.STATUS, valid)
    }, [value])

    useEffect(()=>{
        const configRequest={
            url: "api/v1/opportunity/status",
            method: "GET",
        }

        function applyData(res){
            
            setStatus(res.data.data)
        }


        (async()=>{
            await httpRequest(configRequest, applyData)
        })()
    },[])


    return(
        <div>
            <label>Status</label>
            <select 
                    name={FIELDS.STATUS} 
                    onChange={inputChange}
                    >
                <option value="">Choose Status</option>
                {
                    status.map((stat, index)=>{
                        
                        return(
                            <option 
                                key={index}
                                value={stat.value}
                                >
                                {stat.name}
                            </option>
                        )
                    })
                }
            </select>
            <p className="error">{valid? "" : "Required"}</p>
        </div>
    )
}

export default OpportunityStatus;