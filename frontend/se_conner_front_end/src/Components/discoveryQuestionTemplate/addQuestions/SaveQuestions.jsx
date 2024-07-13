import React, {useMemo} from "react";
import { useNavigate } from "react-router-dom";
import useTemplate from "../../../hooks/useTemplate";
import useHttp from "../../../hooks/useHttp";



function SaveQuestions({id, data}){
    const {save_question_ids} = useTemplate();
    const {httpRequest} = useHttp();
    const navigate = useNavigate();

    const save = useMemo(() => {
        
        return save_question_ids(data.original_question_ids, data.question_ids);

    }, [data.original_question_ids, data.question_ids]);

    function submit(e){
        e.preventDefault();
        
        const configRequest={
            method: 'POST',
            url: `api/v1/discovery-question-templates/${id}/questions`,
            data: data.question_ids
        }


        function applyData(res){

            if(res.status === 200){
                navigate(`/discoveryquestions/templates`)
            }
            
        };

        (async ()=>{
            await httpRequest(configRequest, applyData);
        })();
    }

    return(
        <>
            <h1>Save Questions</h1>
            <div className="template_save">
                <button 
                    disabled={!save}
                    onClick={(e)=>submit(e)}
                    >Save</button>
            </div>
        </>
    )
}


export default SaveQuestions;