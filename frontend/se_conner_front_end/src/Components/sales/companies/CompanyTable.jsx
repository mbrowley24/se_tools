import React, {useEffect, useState } from "react";
import CompanyTableHead from "./CompanyTableHead";
import CompanyTableBody from "./CompanyTableBody";
import useHttp from "../../../hooks/useHttp";

function CompanyTable(){
    const [data, setData] = useState([]);
    const {httpRequest} = useHttp();    
    
    useEffect(() => {
        const configRequest = {
            url: "api/v1/sales/companies",
            method: "GET"
        }

        function applyData(res){
            console.log(res.data.data.items);
            if(res.status === 200){
                if(res.data.data.items){
                    setData(res.data.data.items);
                }
            }
        }

        (async() =>{
            await httpRequest(configRequest, applyData);
        })()

    }, []);
    
    return(
        <table>
            <CompanyTableHead/>
            <CompanyTableBody data={data}/>
        </table>
    )
}

export default CompanyTable;