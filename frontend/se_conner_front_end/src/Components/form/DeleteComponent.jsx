import React from 'react';
import "../../css/modal/modal.css"

function DeleteComponent({data, onClose, deleteAction}) {
    
    

    return (

        <div className="message">
            <h1>Delete</h1>
            <div>
                <p className="message-text">
                    Are you sure you want to delete <strong>{data}</strong>?
                </p>
            </div>
            <div>
                <button className="delete" 
                    onClick={(e)=>deleteAction(e)}
                >Delete</button>
                <button className="actions" onClick={()=>onClose()}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteComponent;