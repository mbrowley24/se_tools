import React from 'react';
import useHttp from '../../../../hooks/useHttp';
import useTextTransform from '../../../../hooks/useTextTransform';
import { useDispatch } from 'react-redux';
import { salesRepActions } from '../../../../store/salesRep';
import "../../../../css/salesrep/deleteSalesRep.css"

function DeleteSalesRep({data, onClose}) {
    const {capitialize} = useTextTransform();
    const { httpRequest } = useHttp();
    const dispatch = useDispatch();

    function deleteRep(e){
        e.preventDefault();
        const configRequest = {
            url: `api/v1/sales-reps/${data.id}`,
            method: 'DELETE',
            responseType: 'json'
        }

        function applyData(res){
            
            if(res.status === 200){
                dispatch(salesRepActions.deleteRep(res.data))
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData)
        })()
    }

    return (

        <div className="message">
            <h1>Delete</h1>
            <div>
                <p className="message-text">
                    Are you sure you want to delete <strong>{capitialize(data.first_name)} {capitialize(data.last_name)} ({data.email})</strong>?
                </p>
            </div>
            <div>
                <button className="delete" 
                    onClick={(e)=>deleteRep(e)}
                >Delete</button>
                <button className="actions" onClick={()=>onClose()}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteSalesRep;