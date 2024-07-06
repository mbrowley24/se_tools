import React from "react";



function MeetingIsVirtual({data, edit, error, inputChange, name}){

    return(
        <>
        {
            edit?
            <>
                <input type="checkbox"
                    checked={data}
                    name={name}
                    onChange={(e)=>inputChange(e)}
                />
            </>
            :
            data
            
        }
        
    </>
    )
}

export default MeetingIsVirtual;