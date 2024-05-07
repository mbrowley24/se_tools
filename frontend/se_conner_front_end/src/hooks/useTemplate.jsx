

function useTemplate() {

    const TEMPLATE_FIELDS={
        NAME: 'name',
        QUESTION_IDS: 'questionIds',
        QUESTIONS : 'questions',
        EDIT_NAME: 'editName',
        EDIT_QUESTIONS: 'editQuestions',
        LOAD_TEMPLATE: 'loadTemplate',
    } 


    //name regex    
    const nameRegex = /^[a-zA-Z0-9\s()\-.]{0,75}$/;

    //name regex    
    const nameValidRegex = /^[a-zA-Z0-9\s()_\-.]{3,75}$/;

    function validateNameInput(name){
        return nameRegex.test(name);
    }

    //validate name
    function validateName(name){
        return nameValidRegex.test(name);
    }

    // Initial state
    const initialTempState = {
        // initial state
        template:{
            name: '',
            questionIds: [],
        },

        //checks name state
        editName: false,

        //add/remove questions to the template

        editQuestions: false,
        
        //holds the data from the api
        questionData: [],
    }

    //add or remove questions from the template
    function addOrRemoveQuestion(idList, questionId){
        
        const includes = idList.includes(questionId);

        let returnValue = [];

        if(includes){
            
            returnValue = idList.filter(id => id !== questionId);

        }else{
            
            returnValue = [...idList, questionId];
        }

        return returnValue;
    }


    // Reducer function
    function templateReducer(state, action) {
        
        let data = JSON.parse(JSON.stringify(state));

        switch (action.type) {

            case TEMPLATE_FIELDS.NAME:
                
                data.template.name = action.payload;

                return data;
            
            case TEMPLATE_FIELDS.QUESTION_IDS:

                const currentQuestionIds = data.template.questionIds;

                newQuestionIds = addOrRemoveQuestion(currentQuestionIds, action.payload);

                data.template.questionIds = [...newQuestionIds];

                return data;
            
            case TEMPLATE_FIELDS.QUESTIONS:
                    
                    data.questionData = [...action.payload];
    
                    return data;
            
            case TEMPLATE_FIELDS.EDIT_NAME:
                    
                    data.editName = !data.editName;
    
                    return data;

            case TEMPLATE_FIELDS.LOAD_TEMPLATE:
                
                data.template.name = action.payload.name;

                if(action.payload.questions){
                    
                    const questions = [...action.payload.questions]

                    for(let i = 0; i < questions.length; i++){

                        data.template.questionIds.push(questions[i].id);
                        data.questionData.push(questions[i]);
                    }
                }
                
                return data;

                case TEMPLATE_FIELDS.EDIT_QUESTIONS:
                    
                    console.log('edit questions')
                    data.editQuestions = !data.editQuestions;

                    console.log(data)
                    return data;

            default:
                return state;
        }
    }

    return ({
        initialTempState,
        templateReducer,
        TEMPLATE_FIELDS,
        validateNameInput,
        validateName,
  })
}


export default useTemplate;