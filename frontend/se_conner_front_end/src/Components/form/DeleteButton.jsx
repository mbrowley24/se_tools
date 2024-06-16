import React from "react";



function DeleteButton({deleteAction}){

    return(
        <button className="delete" onClick={()=>deleteAction()}>
                <span className="material-symbols-outlined">
                    delete
                </span>
        </button>
    )
}

export default DeleteButton;