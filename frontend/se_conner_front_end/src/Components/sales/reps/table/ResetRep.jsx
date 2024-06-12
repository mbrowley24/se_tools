import React from "react";




function ResetRep({resetRep}){;
    return(
        <button className="reset" onClick={()=>resetRep()}>
            <span className="material-symbols-outlined">
                undo
            </span>
        </button>
    )
};
export default ResetRep;