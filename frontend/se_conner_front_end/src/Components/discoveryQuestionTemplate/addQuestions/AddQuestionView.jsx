import React from "react";
import Header from "../../header/Header";
import { useParams } from "react-router-dom";
import AddQuestions from "./AddQuestions";
import "../../../css/question_template/question_template.css"


function AddQuestionView(){
    const {id} = useParams();

    return(
        <div>
            <Header/>
            <AddQuestions id={id}/>
        </div>
    )
}

export default AddQuestionView;