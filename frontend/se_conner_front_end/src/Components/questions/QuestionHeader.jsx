import React from "react";



function QuestionHeader({data}){
    return(
        <div class="data_header">
        <div class="createdby">
            <p><span>Created By:</span>  {data.author}</p>
        </div>
        <div  class="insight_link">
        </div>
        <div class="vote_container">
            <div>
                <p><span>likes:</span> {data.voteup}</p>
            </div>
            <div>
                <p>dislikes: {data.votedown}</p>
            </div>
        </div>
    </div>
    )
};

export default QuestionHeader;