import React from "react";
import useTextTransform from "../../../../hooks/useTextTransform";


function MeetingOpporunity({data}){
    const {capitialize} = useTextTransform();
    return(
        <>
            <h4>{capitialize(data.name)}</h4>
            <h4>{`Value: $${data.value}`}</h4>
        </>
        
    )
}

export default MeetingOpporunity;