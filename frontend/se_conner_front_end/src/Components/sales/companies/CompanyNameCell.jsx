import React,{useEffect} from "react";
import useHttp from "../../../hooks/useHttp";
import { useDispatch } from "react-redux";
import { companyActions } from "../../../store/company";


function CompanyNameCell({errors, inputChange, name, value}){
    const {httpRequest} = useHttp();
    const dispatch = useDispatch();
    useEffect(()=>{

        if(value.length === 0) return

        const checkName = setTimeout(()=>{
            const configRequest = {
                url: 'api/v1/companies/check/name',
                method: 'POST',
                data: {name: value},
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
    }, [value]);


    return(
        <td>
            <input type="text" name={name} value={value} onChange={(e)=>inputChange(e)} />
            { errors && errors.name && <p className="errors">{errors.name}</p>}
            { errors && errors.exists && <p className="errors">{errors.exists}</p>}
        </td>
    )
}

export default CompanyNameCell;