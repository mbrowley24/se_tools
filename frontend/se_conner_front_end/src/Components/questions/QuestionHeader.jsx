import React from "react";



function QuestionHeader({data}){
    return(
        <div className="question_header">
            <div className="createdby">
                <p><span>Created By:</span>  {data.author}</p>
            </div>
            <div className="vote_container">
                <div>
                    <p><span>Likes:</span> {data.voteup}</p>
                </div>
                <div>
                    <p>Dislikes: {data.votedown}</p>
                </div>
            </div>
    </div>
    )
};

export default QuestionHeader;