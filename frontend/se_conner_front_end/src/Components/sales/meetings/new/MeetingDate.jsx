import React from "react";



function MeetingDate({data, edit, error, inputChange, name}){

    return(
        <>
            {
                edit?
                <>
                    <input type="date"
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

export default MeetingDate;