import React from "react";



function DeleteButton({deleteAction}){

    return(
        <button className="delete" onClick={(e)=>deleteAction(e)}>
                <span className="material-symbols-outlined">
                    delete
                </span>
        </button>
    )
}

export default DeleteButton;