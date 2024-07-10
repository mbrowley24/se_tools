import React from "react";
import { useNavigate } from "react-router-dom";
import useTextTransform from "../../../hooks/useTextTransform";


function QuestionHeader({data, modal}){
    const {capitalizeName} = useTextTransform();
    const navigate = useNavigate();

    const edit = () => navigate(`/discoveryquestions/${data.id}`) 

    return(
        <div className="question_header">
            <div className="createdBy">
                <p><span>Created By:</span>  {capitalizeName(data.author)}</p>
            </div>
            <div className="panel_buttons">
                <button className="edit" onClick={()=>edit()}>Edit</button>
                <button className="delete" onClick={()=>modal()}>Delete</button>
            </div>
    </div>
    )
};

export default QuestionHeader;