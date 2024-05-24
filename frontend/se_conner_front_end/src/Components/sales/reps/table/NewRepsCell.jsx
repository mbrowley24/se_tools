import React from "react";


function NewRepsCell({submit, reset}){
    return(
        <td colSpan={'2'} className="">
            <button className="actions"
                onClick={(e)=> submit(e)}
            >Create</button> 
            <button className="actions"
                onClick={()=>reset()}
            >Reset</button>
        </td>
    )
}

export default NewRepsCell;