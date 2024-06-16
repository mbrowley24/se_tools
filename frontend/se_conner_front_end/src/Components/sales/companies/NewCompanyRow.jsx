import React, {useMemo, useState} from "react";
import useCompany from "../../../hooks/useCompany";
import TextField from "../../form/TextField";
import useHttp from "../../../hooks/useHttp";
import { useDispatch } from "react-redux";
import { companyActions } from "../../../store/company";
import VerticalSelection from "./VerticalSelection";
import CompanyNameCell from "./CompanyNameCell";

function NewCompanyRow({data, errors}){
    const dispatch = useDispatch();
    const {httpRequest} = useHttp();
    
    const reset = () => dispatch(companyActions.reset());

    function save(e){
        
        console.log("save");

        const configRequest = {
            url: 'api/v1/companies',
            method: 'POST',
            data: JSON.parse(JSON.stringify(data)),
        };
        
        function applyData(res){
            
            if(res.status === 200){

                if(res.data.payload){
                    
                    dispatch(companyActions.addCompany(res.data.payload));
                    
                }
            }

            if(res.response && res.response.status === 400){
                
                if(res.response.data.errors){
                    dispatch(companyActions.setErrors(res.response.data.errors));
                }
            }
            
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();

    }
    
    function inputChange(e){
        
        const {name, value} = e.target;
        const newCompany = {...data};
        newCompany[name] = value;
        dispatch(companyActions.newCompany(newCompany));
    }

    
    return(
        <tr>
            <CompanyNameCell name={"name"}
                            value={data.name}
                            inputChange={inputChange} 
                            errors={errors}/>
            <td>
                <VerticalSelection name={"vertical"} value={data.vertical} onChange={inputChange} errors={errors}/>
            </td>
            <td>
                <button disabled={Object.keys(errors).length > 0}
                    className="update"
                    onClick={(e) => save(e)}
                >
                    <span className="material-symbols-outlined">
                        save
                    </span>
                </button>
                <button className="reset"
                    onClick={()=>reset()}
                >
                    <span className="material-symbols-outlined">
                        undo
                    </span>
                </button>
            </td>
            <td colSpan={'5'}></td>
        </tr>
    )
}

export default NewCompanyRow;