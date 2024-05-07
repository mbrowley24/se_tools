import React, {useState} from "react";
import TemplateFormCurrentQuestions from "./TemplateFormCurrentQuestions";
import TemplateFormAddQuestion from "./TemplateFormAddQuestion";
import EditTemplateName from "./EditTemplateName";

function TemplateForm({data, id, setUpdate}) {

    
    const [editQuestions, setEditQuestions] = useState(false);

    const addRemoveQuestions = () => setEditQuestions(!editQuestions);
    const editNameAction = () => setEditName(!editName);

    function inputChange(){
      
    }

    


    return (
      <div>
        <EditTemplateName data={data} id={id}/>
        {!editQuestions &&
          <TemplateFormCurrentQuestions
              edit={addRemoveQuestions}
              data={data.questions}
            />
          }
          {editQuestions && 
            <TemplateFormAddQuestion
              data={data}
              setUpdate={setUpdate}
              id={id}
            />
          }
      </div>
    );
}

export default TemplateForm;