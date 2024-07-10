import React from "react";
import Category from "./Category";
import Industry from "./Industry";
import {Link} from "react-router-dom";
import TextArea from "../../form/TextArea";
import useDiscoveryQuestions from "../../../hooks/useDiscoveryQuestions";




function QuestionForm({submit, data, onChange, errors, cancelLink}){
    const {DISCOVERY_QUESTION_FIELD} = useDiscoveryQuestions();


    return(
        <form onSubmit={submit}>
            <div className="attributes">
                <Category 
                    value={data.categories}
                    onChange={onChange}
                    name={DISCOVERY_QUESTION_FIELD.CATEGORY}
                    error={errors["category"]}
                    />
                <Industry 
                    value={data.industries}
                    onChange={onChange}
                    name={DISCOVERY_QUESTION_FIELD.INDUSTRY}
                    error={errors["industry"]}
                    />
            </div>
            <div className="text_area">
                <TextArea value={data.question} 
                    label="Question"
                    name={DISCOVERY_QUESTION_FIELD.QUESTION}
                    onChange={onChange}
                />
                <p className="error">{errors['question']? errors['question'] : ""}</p>
                <div className="count">{data.question.length}/255</div>
            </div>
            <div className="submit">
                <Link to={'/discoveryquestions'}>Cancel</Link>
                <button disabled={Object.keys(errors).length > 0}>Save</button>
            </div>
        </form>
    )
}

export default QuestionForm;