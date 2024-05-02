import React from "react";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import AddToTemplate from "./AddToTemplate";



function QuestionToolbar({data, setQuestion, template}){
    
    
    return(
        <div className="tool-bar">
            <CommentButton data={data} url={'api/v1/comment'} label={"Comment"}/>
            <LikeButton url="api/v1/questions/like"
                        like={true} label="Like"
                        question_id={data.id}
                        setQuestion={setQuestion}
                        disabled={data.my_vote}
                        /> 
            <LikeButton 
                url="/api/v1/questions/like" 
                like={false} label="Dislike"
                question_id={data.id}
                setQuestion={setQuestion}
                disabled={!data.my_vote}
                />
            { template &&  <AddToTemplate/>}


        </div>
    )
}

export default QuestionToolbar;