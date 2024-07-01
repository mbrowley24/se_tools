import React from "react";
import DeleteComponent from "../../form/DeleteComponent";
import useTextTransform from "../../../hooks/useTextTransform";
import useHttp from "../../../hooks/useHttp";
import {useDispatch} from "react-redux";
import { companyActions } from "../../../store/company";

function CompanyDelete({data, onClose}){
    const dispatch = useDispatch();
    const {capitialize} = useTextTransform();
    const {httpRequest} = useHttp();

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
                onClose();
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();

    }

    return(
        <DeleteComponent data={capitialize(data.name)} 
                        onClose={onClose} 
                        deleteAction={deleteCompany}
                        />
    )
}

export default CompanyDelete;