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
            console.log(res.data);
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