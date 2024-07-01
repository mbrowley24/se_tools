import React from 'react';
import DeleteComponent from '../../../form/DeleteComponent';
import useHttp from '../../../../hooks/useHttp';
import useTextTransform from '../../../../hooks/useTextTransform';
import { useDispatch } from 'react-redux';
import { companyActions } from '../../../../store/company';
import "../../../../css/delete/delete.css"

function OpportunityDelete({data, onClose}) {
    const {capitialize} = useTextTransform();
    const { httpRequest } = useHttp();
    const dispatch = useDispatch();

    function deleteAction(e){
        e.preventDefault();

        const configRequest={
            url: `api/v1/opportunities/${data.id}/delete`,
            method: "DELETE",
        }

        function applyData(res){
            console.log(res);
            if(res.status === 200){
                dispatch(companyActions.updateOpportunities(res.data));
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData);
        })();
    }

    return (
        <DeleteComponent data={capitialize(data.name)} onClose={onClose} deleteAction={deleteAction}/>
    )
}

export default OpportunityDelete;