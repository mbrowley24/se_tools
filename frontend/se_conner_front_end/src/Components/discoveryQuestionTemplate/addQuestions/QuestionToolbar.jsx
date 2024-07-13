import React, {useMemo} from "react";
import useTextTransform from "../../../hooks/useTextTransform";




function QuestionToolbar({data, dispatch, question_ids}){
    const isChecked = useMemo(() => {
        return question_ids.indexOf(data.id) > -1
    }, [question_ids, data.id]);

    const {capitalizeName} = useTextTransform();

    function inputChange(e){
        const {checked} = e.target;
        
        if(checked){
        
            dispatch({type: "add_question", payload: data.id})
        
        }else{
        
            dispatch({type: "remove_question", payload: data.id})
        }
    }

    return(
        <div className="tool_bar">
            <div className="author">
                <p><strong>Author: </strong>  {capitalizeName(data.author)}</p>
            </div>
            <div className="add">
                <p>Add</p>
                <input type="checkbox" 
                    checked={isChecked}
                    name={'question_id'}
                    onChange={(e)=>inputChange(e)}
                />
                
            </div>
            
        </div>
    )
}

export default QuestionToolbar;