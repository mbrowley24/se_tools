import React, {useEffect, useMemo, useReducer} from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import CompanyNameCell from "./CompanyNameCell";
import VerticalSelection from "./VerticalSelection";
import useCompany from "../../../hooks/useCompany";
import CompanyTableAction from "./CompanyTableAction";
import { useDispatch } from "react-redux";
import { companyActions } from "../../../store/company";
import useTextTransform from "../../../hooks/useTextTransform";




function CompanyTableRow({data}){
    const navigate = useNavigate();
    const {httpRequest} = useHttp();
    const {capitialize, valueCommas} = useTextTransform();
    const {initalCompnayState, companyReducer, detectChange} = useCompany();
    const dispatch = useDispatch();    
    const [company, dispatchCompany] = useReducer(companyReducer, initalCompnayState);
    
    const change = useMemo(()=>detectChange(data, company), [data, company]);
    
    const valid = useMemo(()=>company.errors && Object.keys(company.errors).length === 0, [company]);
    
    const gotoCompany = (id) => navigate(`/sales/companies/${id}`);
    
    function toContacts(id){
        if(!id) return
        dispatch(companyActions.viewContacts());
        gotoCompany(id);

    }

    function toOpportunities(id){
        if(!id) return
        dispatch(companyActions.viewOpportunities());
        gotoCompany(id);
    }

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
                            value={capitialize(company.name)}
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
                <button className="btn_link" onClick={()=>toOpportunities(company.id)}>{company?.opportunities}</button>
            </td>
            <td><button className="btn_link" onClick={()=>toContacts(company.id)}>{company?.contacts}</button></td>
            <td>{company?.percentage}</td>
            <td>{`$${valueCommas(company?.open)}`}</td>
            <td>{company?.updated}</td>
            <CompanyTableAction edit={change} valid={valid} reset={reset} data={company}/>
        </tr>
    )
}
export default CompanyTableRow;