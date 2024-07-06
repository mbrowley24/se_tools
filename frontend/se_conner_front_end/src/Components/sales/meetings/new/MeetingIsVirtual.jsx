import React from "react";



function MeetingIsVirtual({data, edit, inputChange, name}){

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
            data? "Yes" : "No"
            
        }
        
    </>
    )
}

export default MeetingIsVirtual;