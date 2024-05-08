import React, {useState} from "react";
import TemplateFormCurrentQuestions from "./TemplateFormCurrentQuestions";
import TemplateFormAddQuestion from "./TemplateFormAddQuestion";
import EditTemplateName from "./EditTemplateName";
import useHttp from "../../hooks/useHttp";

function TemplateForm({data, id, setData, setUpdate, update, queryQuestions, isChanged}) {
    const {httpRequest} = useHttp();

    const [editQuestions, setEditQuestions] = useState(false);

    const addRemoveQuestions = () => setEditQuestions(!editQuestions);

    function addOrRemoveQuestion(e){
      e.preventDefault();


      const configRequest = {
          url: `api/v1/questions/templates/${id}/addRemove`,
          method: 'PUT',
          data: {questionIds: data.questionsIds}
      };

      function applyData(res){

          if(res.status === 200){
            console.log(res);
            queryQuestions();
          }
      }

      (async () => {
          await httpRequest(configRequest, applyData);
      })();
      
  }
  

    return (
      <div>
        <EditTemplateName data={data} id={id}/>
        {!update &&
          <TemplateFormCurrentQuestions
              edit={addRemoveQuestions}
              setUpdate={setUpdate}
              data={data}
              isChanged={isChanged}
              setData={setData}
              addOrRemoveQuestion={addOrRemoveQuestion}
            />
          }
          {update && 
            <TemplateFormAddQuestion
              data={data}
              setData={setData}
              editQuestions={addRemoveQuestions}
              id={id}
              isChanged={isChanged}
              setUpdate={setUpdate}
              setEditQuestions={setEditQuestions}
              addOrRemoveQuestion={addOrRemoveQuestion}
            />
          }
      </div>
    );
}

export default TemplateForm;