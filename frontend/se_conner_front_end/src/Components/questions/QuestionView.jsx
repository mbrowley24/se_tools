import React from "react";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Questions from "./Questions";
import "../../css/discoveryQuestions/questions.css"


function QuestionView({}){

    return(
        <div className="page_height">
            <Header/>
            <div className="title_container">
                <h2>Discovery Questions</h2>
                <Link to={'/discoveryquestions/new'}>New Question</Link>
            </div>
            <Questions/>
        </div>
    )
}

export default QuestionView;