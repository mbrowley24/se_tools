import React, {useEffect, useMemo, useState} from "react";
import useHttp from "../../../../hooks/useHttp";
import useSalesRep from "../../../../hooks/useSalesRep";


function OpportunitySalesRep({value, inputChange, isValid}){
    const [salesReps, setSalesReps] = useState([]);
    const {httpRequest} = useHttp()
    const {FIELDS} = useSalesRep();
    const valid = useMemo(()=>{
        const salesRepList = [...salesReps] 
        return salesRepList.filter(rep=>rep.value === value).length > 0
    }, [value])

    useEffect(()=>{    
        isValid(FIELDS.SALESREP, valid)
    }, [valid])


    useEffect(()=>{

        const configRequest={
            url: "api/v1/sales/reps/options",
            method: "GET"
        }

        function applyData(res){
            if(res.data.data){
                setSalesReps(res.data.data)
            }

        }


        (async()=>{
            await httpRequest(configRequest, applyData)
        })()

    },[])

    return(
        <div>
            <label>Sales Rep</label>
            <select name={FIELDS.SALESREP}
                value={value}
                onChange={(e)=>inputChange(e)}
            >
                <option value={""} >Select Sales Rep</option>
                {
                    salesReps.map((rep, index)=>{
                        return(
                            <option key={index}
                                value={rep.value}
                                >{rep.name}</option>
                        )
                    })
                }

            </select>
            <p className="error">{valid? "" : "Required"}</p>
        </div>
    )
}

export default OpportunitySalesRep;