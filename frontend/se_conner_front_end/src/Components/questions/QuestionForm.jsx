import React from "react";
import Category from "./Category";
import Industry from "./Industry";
import {Link} from "react-router-dom";
import TextArea from "../form/TextArea";
import useDiscoveryQuestions from "../../hooks/useDiscoveryQuestions";




function QuestionForm({submit, data, onChange, disabled}){
    const {DISCOVERY_QUESTION_FIELD} = useDiscoveryQuestions();


    return(
        <form onSubmit={submit}>
            <div className="attributes">
                <Category 
                    value={data.categories}
                    onChange={onChange}
                    name={DISCOVERY_QUESTION_FIELD.CATEGORY}
                    />
                <Industry 
                    value={data.industries}
                    onChange={onChange}
                    name={DISCOVERY_QUESTION_FIELD.INDUSTRY}
                    />
            </div>
            <div className="text_area">
                <TextArea value={data.question} 
                    label="Question"
                    name={DISCOVERY_QUESTION_FIELD.QUESTION}
                    onChange={onChange}
                />
                <div className="count">{data.question.length}/500</div>
            </div>
            <div className="submit">
                <Link to={'/discoveryquestions'}>Cancel</Link>
                <button disabled={disabled}>Save</button>
            </div>
        </form>
    )
}

export default QuestionForm;