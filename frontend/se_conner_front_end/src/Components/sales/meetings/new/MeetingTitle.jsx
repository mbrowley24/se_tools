import React from "react";




function MeetingTitle({data, edit, error, inputChange, name}) {

    return (
        <>
        {
            edit?
            <>
                <input type="text"
                    name={name}
                    value={data} 
                    placeholder="Meeting Title"
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

export default MeetingTitle;