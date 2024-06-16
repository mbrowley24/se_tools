import React from "react";




function ResetButton({reset}){

    return(
        <button className="reset"
        onClick={()=>reset()}
    >
        <span className="material-symbols-outlined">
            undo
        </span>
</button>
    )
}

export default ResetButton;