import React from "react";
import Header from "../header/Header";
import Questions from "./Questions";
import "../../css/discoveryQuestions/questions.css"


function QuestionView({}){

    return(
        <div>
            <Header/>
            <div className="title_container">
                <h2>Discovery Questions</h2>
            </div>
            <Questions/>
        </div>
    )
}

export default QuestionView;