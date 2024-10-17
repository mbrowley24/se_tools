import {useEffect, useState} from "react";
import CompanyTableHead from "./CompanyTableHead.jsx";
import CompanyTableBody from "./CompanyTableBody.jsx";
import useHttp from "../../hooks/useHttp.jsx";
import Header from "../header/Header.jsx";
import {Link} from 'react-router-dom';


function CompanyDashboard({}) {
    const {httpRequest} = useHttp();
    const [companyData, setCompanyData] = useState({
        page: 0,
        limit: 10,
        companies :[]
    });


    useEffect(()=>{

        const requestConfig = {
            method: "GET",
            url: `companies?page=${companyData.page}&limit=${companyData.limit}`
        }

        function applyData(res){

        }

        (async ()=>{
            await httpRequest(requestConfig, applyData);
        })()

    },[])


    return(
        <div className={'container'}>
            <Header/>
            <h1>Companies</h1>
            <div className={'links'}>
                <Link to={'/companies/new'}>New Company</Link>
            </div>
            <table>
                <CompanyTableHead/>
                <CompanyTableBody companies={companyData.companies}/>
            </table>
        </div>

    )
}

export default CompanyDashboard;