import React from "react";
import { useNavigate } from "react-router-dom";

function EditButton({url}){
    const navigate = useNavigate();

    function handleClick(){
        navigate(url);
    }

    return(
        <button className="edit"
            onClick={()=>handleClick()}
        >
            <span className="material-symbols-outlined">
                edit
            </span>
        </button>
    )
}

export default EditButton;