import React from 'react';
import useHttp from '../../../../hooks/useHttp';
import "../../../../css/salesrep/deleteSalesRep.css"

function DeleteSalesRep({ rep, onClose, reset }) {
    const { httpRequest } = useHttp();

    function deleteRep(e){
        e.preventDefault();
        const configRequest = {
            url: `api/v1/sales/reps/${rep.id}`,
            method: 'DELETE',
            responseType: 'json'
        }

        function applyData(res){
            
            if(res.status === 200){
                console.log('Sales Rep Deleted')
                reset();
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData)
        })()
    }


    return (
        <div className='delete_panel'>
            <h3>Delete Sales Rep</h3>
            <p>Are you sure you want to delete <strong>{rep.first_name} {rep.last_name}</strong> ({rep.email})?</p>
            <div className='delete_sales_buttons'>
                <button onClick={onClose}>Cancel</button> 
                <button className='delete_btn' onClick={deleteRep}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteSalesRep;