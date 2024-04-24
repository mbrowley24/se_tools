



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

    const questionPattern = /^[a-zA-Z0-9 :?\/{}\+\-&%$#@!90;',_+."]{0,500}$/


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

    function cleanQuestion(text) {
        let clean_text = text.replace(/[^a-zA-Z0-9 :?\/{}\+\-&%$#@!)(;',_+."]/g, "")
        return clean_text.substring(0, 500)
    }

    function discoveryReducer(state, action) {

        const data = JSON.parse(JSON.stringify(state));
        
        switch(action.type) {
                
            case DISCOVERY_QUESTION_FIELD.QUESTION:
                
                if(questionPattern.test(action.payload)) {
                    
                    data.question = action.payload;

                }else{
                    
                    data.question = cleanQuestion(action.payload);
                }
                
                return data;
            
            case DISCOVERY_QUESTION_FIELD.CATEGORY:
                
                let list = [...data.categories];
                const category_value = action.payload;
                
                data.categories = [...filterList(list, category_value)];
                
                return data;

            case DISCOVERY_QUESTION_FIELD.INDUSTRY:
                
                let industries = [...data.industries];
                const industry_value = action.payload;
                
                
                data.industries = [...filterList(industries, industry_value)];
                
                
                return data;


            default:
                return data;
        }
    }

    return({
        DISCOVERY_QUESTION_FIELD,
        discoveryReducer,
        question,
        validateQuestion

    })
}

export default useDiscoveryQuestions;