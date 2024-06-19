import React, {useEffect, useMemo, useReducer} from "react";
import { Link } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import CompanyNameCell from "./CompanyNameCell";
import VerticalSelection from "./VerticalSelection";
import useCompany from "../../../hooks/useCompany";
import CompanyTableAction from "./CompanyTableAction";




function CompanyTableRow({data}){

    const {httpRequest} = useHttp();
    const {initalCompnayState, companyReducer, detectChange} = useCompany();
    
    const [company, dispatchCompany] = useReducer(companyReducer, initalCompnayState);
    
    const change = useMemo(()=>detectChange(data, company), [data, company]);
    
    const valid = useMemo(()=>company.errors && Object.keys(company.errors).length === 0, [company]);

    function inputChange(e){
        const {value, name} = e.target;

        dispatchCompany({type: name, payload: value});

    }

    const reset = () => dispatchCompany({type:'setup', payload: data});

    useEffect(()=>{

        if(!data) return
        if(!company) return
        if(data.name.length === 0) return

        const checkName = setTimeout(()=>{
            const configRequest = {
                url: 'api/v1/companies/check/name',
                method: 'POST',
                data: {name: company.name},
            };

            function applyData(res){

                if(res.status === 200){
                    const  payload = {
                        update: res.data.payload,
                        errors: res.data.errors,
                        og_name: data.name,                    
                    }

                    dispatchCompany({type: 'duplicate', payload: payload});
                    
                }
            }

            (async () => {
                await httpRequest(configRequest, applyData)
            })();

        }, 100);


        return ()=>{
            clearTimeout(checkName);
        }
    }, [data.name, company.name]);

    useEffect(()=>{

        if(!data) return 

        dispatchCompany({type: 'setup', payload: data});

        return ()=>{}

    },[data]);

    
    return(
        <tr>
            <CompanyNameCell name={"name"} 
                            value={company.name}
                            inputChange={inputChange} 
                            errors={company.errors}/>
            <td>
                <VerticalSelection name={'vertical'}
                                    value={company.vertical}
                                    onChange={inputChange}
                                    errors={company?.errors}
                                    />
            </td>
            <td>
                <Link to={`/sales/companies/${company?.id}`}>{company?.opportunities}</Link>
            </td>
            <td><Link to={`/sales/companies/${company?.id}`}>{company?.contacts}</Link></td>
            <td>{company?.percentage}</td>
            <td>{company?.open}</td>
            <td>{company?.updated}</td>
            <CompanyTableAction edit={change} valid={valid} reset={reset} data={company}/>
        </tr>
    )
}
export default CompanyTableRow;