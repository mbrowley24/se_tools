import {addCommas, checkDate ,quotaInput, regex_map, removeQuotaFormat} from '../helper/general';

function useOpportunity(){

    function checkForErrors(data){
        const errors = {};

        if(data.name.length === 0){
            
            errors.name = "Required";

        }else if(!regex_map.name_regex.test(data.name)){
            
            errors.name = "Invalid name";
        }

        const quota = removeQuotaFormat(data.value);
        
        if(!regex_map.quota_regex.test(quota)){
            
            errors.value = "Invalid quota";
        }

        if(!regex_map.description_regex.test(data.description)){
            
            errors.description = "Invalid description";
        }

        if(data.close_date.length === 0){

            errors.close = "Required";

        }else if(!regex_map.date_regex.test(data.close_date)){
            
            errors.close = "Invalid date";
        }else if(!checkDate(data.close_date)){
                
                errors.close = "must close in the future";
        }


        if(data.sales_rep.length === 0){
            
            errors.sales_rep = "Required";
        }

        if(data.status.length === 0){
            errors.status = "Required";
        }


        return errors;
    }

    const FIELDS ={
        VALUE: "value",
        CLOSE : "close",
        DESCRIPTION: "description",
        EMAIL: "email",
        FIRST_NAME: "first_name",
        LAST_NAME: "last_name",
        NAME : "name",
        PHONE: "phone",
        QUOTA: "quota",
        ROLE: "role",
        SALESREP: "sales_Rep",
        STATUS : "status",
        RESET: "reset",
    }

    const initialState = {
        id: "",
        name: "",
        value: "",
        description: "",
        close_date: "",
        status: "",
        sales_rep: "",
        updated: ""
    }
    
    function opportunityReducer(state, action){

        const data = JSON.parse(JSON.stringify(state));

        switch(action.type){

            case FIELDS.NAME:

                const name = action.payload; 
                if(regex_map.name_regex_input.test(name)){
                    data.name = name;
                }

                return data;

            case FIELDS.VALUE:
                
                const quota = removeQuotaFormat(action.payload);
                
                
                if(regex_map.quota_regex_input.test(quota)){

                    const formatted_quota = quotaInput(quota);
                    

                    data.value = addCommas(formatted_quota);
                }

                return data;    

            case FIELDS.DESCRIPTION:
                    
                const description = action.payload;

                if(regex_map.description_regex.test(description)){
                    data.description = description;
                }

                return data;
            
            case FIELDS.CLOSE:

                if(regex_map.date_regex.test(action.payload)){
                    data.close_date = action.payload; 
                }

                return data;

            case FIELDS.STATUS:
                
                data.status = action.payload;

                return data;
            
            case FIELDS.SALESREP:

                data.sales_rep = action.payload;

                return data;

            case FIELDS.UPDATE:
                
                data.id = action.payload.id;
                data.name = action.payload.name;
                data.value = action.payload.value;
                data.status = action.payload.status;
                data.close_date = action.payload.close_date;
                data.sales_rep = action.payload.sales_rep;
                data.updated = action.payload?.updated_at;

                return data;

            case FIELDS.RESET:
                return initialState;

            default:
                return data;
        }
    }

    function checkForUpdate(original, edited){

        if(original.name !== edited.name){
            return true;
        }

        if(original.value !== edited.value){
            return true;
        }

        if(original.close !== edited.close){
            return true;
        }

        if(original.status !== edited.status){
            return true;
        }

        if(original.sales_rep !== edited.sales_rep){
            return true;
        }

        return false;
    }
    
    

    return({
        checkForErrors,
        checkForUpdate,
        FIELDS,
        initialState,
        opportunityReducer,
    })
}

export default useOpportunity;