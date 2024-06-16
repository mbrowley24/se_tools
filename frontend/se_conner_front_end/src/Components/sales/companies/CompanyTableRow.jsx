import React, {useEffect, useMemo, useState} from "react";
import CompanyNameCell from "./CompanyNameCell";
import VerticalSelection from "./VerticalSelection";
import useCompany from "../../../hooks/useCompany";
import CompanyTableAction from "./CompanyTableAction";
import { companyActions } from "../../../store/company";



function CompanyTableRow({data}){
    const {changeCompany, detectChange} = useCompany();
    const [company, setCompany] = useState({
        name: '',
        vertical: '',
        opportunities: 0,
        contacts: 0,
        percentage: 0,
        open: 0,
        updated: 0,
        errors:{}
    });
    const change = useMemo(()=>detectChange(data, company), [data, company]);
    const valid = useMemo(()=>company.errors && Object.keys(company.errors).length === 0, [company]);

    function inputChange(e){
        const {value, name} = e.target;
        console.log(value, name);
        const editedCompany = {...company};
        editedCompany[name] = value;
        console.log(editedCompany);
        
        setCompany(changeCompany(editedCompany));

    }

    

    useEffect(()=>{

        if(!data) return 

        const companyData = {...data, errors: {}};

        setCompany(companyData);


        return ()=>{
        }

    },[data]);

    return(
        <tr>
            <CompanyNameCell name={"name"} value={company?.name} inputChange={inputChange}/>
            <td>
                <VerticalSelection name={'vertical'} value={company?.vertical} onChange={inputChange}/>
            </td>
            <td>
                {company?.opportunities}
            </td>
            <td>{company?.contacts}</td>
            <td>{company?.percentage}</td>
            <td>{data.open}</td>
            <td>{data.updated}</td>
            <CompanyTableAction edit={change} valid={valid}/>
        </tr>
    )
}
export default CompanyTableRow;