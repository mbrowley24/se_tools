



function useDiscoveryQuestions() {

    const DISCOVERY_QUESTION_FIELD = {
        QUESTION: "question",
        CATEGORY : "categories",
        INDUSTRY : "industries",
    }

    const question = {
        question: "",
        categories: [],
        industries: [],
    }

    const questionPattern = /^[a-zA-Z0-9 :?\/{}\+\-&%$#@!90;',_+."]{0,255}$/


    function filterList(list, value ){
        
        let new_list = [...list];
        if(new_list.includes(value)){

            new_list = new_list.filter((item)=>item !== value)
        
        }else{
        
            new_list.push(value)
        
        }

        return new_list;
    }

    function validateQuestion(data) {

        let return_value = false;

        if(data.question.length > 10) {

            if(data.question.length < 501) {

                if(data.categories.length > 0) {

                    if(data.industries.length > 0) {

                        return_value = true;
                    }
                }
            }
        }

        return return_value;
    }

    function checkForErrors(data) {
        const errors = {};
        
        if(data.question.trim().length === 0) {
            
            errors['question'] = "required";
        
        }else if(data.question.trim().length < 10) {

            errors['question'] = "must be at least 10 characters long";

        }else if(data.question.trim().length > 255) {
                
            errors['question'] = "must be less than 255 characters long";
        
        }else if(!questionPattern.test(data.question)) {
                
            errors['question'] = "invalid characters";
        
        }else {
                
            delete errors['question'];
        }

        if(data.categories.length < 1) {
            errors['category'] = "required";
        }

        if(data.industries.length < 1) {
            errors['industry'] = "required";
        }

        return errors;
    }

    function cleanQuestion(text) {
        let clean_text = text.replace(/[^a-zA-Z0-9 :?\/{}\+\-&%$#@!)(;',_+."]/g, "")
        return clean_text.substring(0, 255)
    }

    function discoveryReducer(state, action) {

        const data = JSON.parse(JSON.stringify(state));
        
        switch(action.type) {
                
            case DISCOVERY_QUESTION_FIELD.QUESTION:
                
                if(action.payload.length < 255) {
                    
                    data.question = action.payload;

                }else{
                    
                    data.question = cleanQuestion(action.payload);
                }
                
                return data;
            
            case DISCOVERY_QUESTION_FIELD.CATEGORY:
                
                const category_value = action.payload;

                if(category_value === "") {
                    return data;
                }
                
                let list = [...data.categories];
                
                
                data.categories = [...filterList(list, category_value)];
                
                
                return data;

            case DISCOVERY_QUESTION_FIELD.INDUSTRY:

                const industry_value = action.payload;

                if(industry_value === "") {
                    
                    return data;
                }
                
                let industries = [...data.industries];
                
                
                
                data.industries = [...filterList(industries, industry_value)];
                
                
                return data;
            
            case "update":

                data.question = action.payload.question;
                data.categories = action.payload.categories;
                data.industries = action.payload.industries;

                return data;


            default:
                return data;
        }
    }

    return({
        checkForErrors,
        DISCOVERY_QUESTION_FIELD,
        discoveryReducer,
        question,
        validateQuestion

    })
}

export default useDiscoveryQuestions;