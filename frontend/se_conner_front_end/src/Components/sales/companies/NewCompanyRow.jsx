import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import { useDispatch } from "react-redux";
import { companyActions } from "../../../store/company";
import VerticalSelection from "./VerticalSelection";
import CompanyNameCell from "./CompanyNameCell";

function NewCompanyRow({data, errors}){
    const dispatch = useDispatch();
    const {httpRequest} = useHttp();
    const navigate = useNavigate();
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
                    
                    

                    navigate(`/sales/companies/${payload.id}`);

                    console.log("Company added");
                    
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

    useEffect(()=>{

        if(data.name.length === 0) return

        const checkName = setTimeout(()=>{
            const configRequest = {
                url: 'api/v1/companies/check/name',
                method: 'POST',
                data: {name: data.name},
            };

            function applyData(res){

                if(res.status === 200){
                    const  payload = {
                        update: res.data.payload,
                        errors: res.data.errors                    
                    }

                    dispatch(companyActions.setNameExistsError(payload));
                }
            }

            (async () => {
                await httpRequest(configRequest, applyData)
            })();

        }, 100);


        return ()=>{
            clearTimeout(checkName);
        }
    }, [data.name]);
    
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
                    className="save"
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