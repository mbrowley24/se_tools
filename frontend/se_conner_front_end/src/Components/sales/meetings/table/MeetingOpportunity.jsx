import React from "react";
import { useNavigate } from "react-router-dom";
import useTextTransform from "../../../../hooks/useTextTransform";


function MeetingOpporunity({data}){
    const {capitialize} = useTextTransform();
    const navigate = useNavigate();

    const back = () => navigate(-1);
    
    return(
        <>
            <h4>{capitialize(data.name)}</h4>
            <h4>{`Value: $${data.value}`}</h4>
            <div className="submit_container">
                <button className="back_button" onClick={back}>Back</button>
            </div>
        </>
        
    )
}

export default MeetingOpporunity;