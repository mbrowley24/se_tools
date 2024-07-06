import React from "react";



function MeetingTime({data, edit, error, inputChange, name}){

    return(
        <>
        {

            edit?
            <>
                <input type="time"
                    name={name}
                    value={data}
                    onChange={(e)=>inputChange(e)}
                    />
                <p className="error">{error? error: ""}</p>
            </>
            :
            data
        }
            
        </>
    )
}

export default MeetingTime;