import {useEffect, useReducer} from "react";
import CompanyTableHead from "./CompanyTableHead.jsx";
import CompanyTableBody from "./CompanyTableBody.jsx";
import useHttp from "../../hooks/useHttp.jsx";
import useCompany from "../../hooks/useCompany.jsx";
import Header from "../header/Header.jsx";
import {Link} from 'react-router-dom';


function CompanyDashboard({}) {
    const {httpRequest} = useHttp();
    const {companyReducer, initialCompanyState} = useCompany();
    const [state, dispatch] = useReducer(companyReducer, initialCompanyState)


    useEffect(()=>{

        const requestConfig = {
            method: "GET",
            url: `companies?page=${state.page.num}&limit=${state.page.limit}`
        }

        function applyData(res){

            dispatch({type: "page", payload: res.data})
        }

        httpRequest(requestConfig, applyData);

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
                <CompanyTableBody companies={state.page.companies}/>
            </table>
        </div>

    )
}

export default CompanyDashboard;