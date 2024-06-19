import React from "react";
import SaveButton from "../../form/SaveButton";
import ResetButton from "../../form/ResetButton";
import DeleteButton from "../../form/DeleteButton";
import useHttp from "../../../hooks/useHttp";
import {useDispatch} from "react-redux";
import { companyActions } from "../../../store/company";

function CompanyTableAction({data, edit, reset, valid}){
    const {httpRequest} = useHttp();
    const dispatch = useDispatch();

    function deleteCompany(e){
        e.preventDefault();
        
        const configRequest = {
            url: `api/v1/companies/${data.id}`,
            method: 'DELETE',
            data: null,
        }


        function applyData(res){
        
            if(res.status === 200){
                dispatch(companyActions.deleteCompany(res.data));
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();

    }



    function saveCompany(e){
        e.preventDefault();
        
        const configRequest = {
            url: `api/v1/companies/${data.id}`,
            method: 'PUT',
            data: data,
        }

        function applyData(res){
        
            if(res.status === 200){
                console.log(res.data)
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();
    }

    return(
        <td>
            {
                edit ? 
                    <>
                        <SaveButton disable={!valid}/>
                        <ResetButton reset={reset}/>
                    </>

                :
                    <DeleteButton deleteAction={deleteCompany}/>
            }
            
        </td>
    )
}

export default CompanyTableAction;