import React from "react";




function SaveButton({save, disable}){
    return(
        <button className="save"
            onClick={(e)=>save(e)}
            disabled={disable}
        >
            <span className="material-symbols-outlined">
                save
            </span>
        </button>
    )
}

export default SaveButton;