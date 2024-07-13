

function useTemplate() {

    const TEMPLATE_FIELDS={
        NAME: 'name',
        QUESTION_IDS: 'questionIds',
        QUESTIONS : 'questions',
        EDIT_NAME: 'editName',
        EDIT_QUESTIONS: 'editQuestions',
        LOAD_TEMPLATE: 'loadTemplate',
    } 


    
    function checkForChanges(orglist, editableList){


        if(orglist.length !== editableList.length){
            return true;
        }

        for(let i = 0; i < orglist.length; i++){
            
            if(orglist[i] !== editableList[i]){
                return true;
            }
        }
        

        return false;
    }

    function updateQuestionOrder(order, id, data){
        const question_index = order - 1;
        const question = data.find(question => question.id === id);
        const filtered_list = data.filter(question => question.id !== id);
        const new_order = []
        
        for(let i = 0; i < filtered_list.length; i++){
            
            if(i === question_index){
                new_order.push(question);
            }

            new_order.push(filtered_list[i]);
        }

        return new_order;
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

    const templateQuestionInit = {
        page:{
            number : 0,
            size : 10,
            totalPages : 1,
            totalElements : 0,
            first: false,
            last: false,
            content: []
        },
        question_ids: [],
        original_question_ids: [],
    }

    function templateQuestionReducer(state, action){
        let data = JSON.parse(JSON.stringify(state));

        switch(action.type){
            case 'page':
                data.page = action.payload;
                return data;
            case 'current_question_ids':
                data.question_ids = action.payload;
                return data;
            
            case 'set_up':
                console.log(action.payload)
                
                data.page = JSON.parse(JSON.stringify(action.payload.page));
                
                data.question_ids = [...action.payload.question_ids];
                
                data.original_question_ids = [...action.payload.question_ids];
                console.log(data)
                return data;
            
            case 'add_question':
                
                data.question_ids = [...data.question_ids, action.payload];
                return data;

            case 'remove_question':
                    
                data.question_ids = [...data.question_ids.filter(id => id !== action.payload)];
                return data;
            default:
                return state;
        }
    }


    function save_question_ids(original, edited){
        
        if( original.length === 0 && edited.length === 0){
            return false;
        }

        if(original.length > 50){

            return false
        }

        if(original.length !== edited.length){
            return true;
        }

        for(let i = 0; i < original.length; i++){
            
            if(original[i] !== edited[i]){
                return true;
            }
        }

        return false;

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
        checkForChanges,
        initialTempState,
        save_question_ids,
        templateReducer,
        TEMPLATE_FIELDS,
        templateQuestionInit,
        templateQuestionReducer,
        updateQuestionOrder,
        validateNameInput,
        validateName,
    });
}


export default useTemplate;