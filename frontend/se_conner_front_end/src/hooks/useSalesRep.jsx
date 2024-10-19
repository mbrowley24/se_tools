


function useSalesRep() {
    

    const FIELDS ={
        value: "value",
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
        UPDATE: "update",
        FORMAT: "format",
        RESET: "reset"
    }


    const name_regex = /^[a-zA-Z]{2,75}$/;
    const name_regex_input = /^[a-zA-Z]{0,75}$/;
    const description_regex = /^[a-zA-Z0-9."?()*&%$#@;'"!\/<>,:{}[\]+=_\- :&]{0,255}$/;
    const phone_regex = /^[0-9]{10}$/;
    const date_regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    const phone_regex_input = /^[0-9]{0,10}$/;
    const quota_regex_input = /^[0-9]{0,15}$/;
    const quota_regex = /^[0-9]{0,15}$/;
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 

    const salesRepInitialState = {
        sales_rep: {
            id: '',
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            role: "",
            quota: "0.00"
        },
        roles: [],
        sales_reps :[],
        errors: {},

    }



    function salesRepReducer(state, action) {

        const data = JSON.parse(JSON.stringify(state));

        switch (action.type) {

            case "first_name":

                data.sales_reps.first_name = action.payload;

                return data;
            case 'last_name':

                data.sales_reps.last_name = action.payload;
                return data;

            case 'email':
                data.sales_reps.email = action.payload;
                return data;

            case 'phone':
                data.sales_reps.phone = action.payload;
                return data;

            case 'role':
                data.sales_reps.role = action.payload;
                return data;

            case 'quota':

                data.sales_reps.quota = action.payload;

                return data;

            default:
                return state
        }
    }


    function formatSalesRep(salesRepObj){

        salesRepObj.phone = removePhoneFormat(salesRepObj.phone);

        salesRepObj.quota = Number(salesRepObj.quota);
        
        return salesRepObj;
    }

    function dateFormat(date){

        return date;
    }

    function dateValidation(date){

        return date_regex.test(date);


    }

    function descriptionValidation(description){
            
            return description_regex.test(description);
    

    }

    function emailValidation(email){

        return email_regex.test(email);
    }

    function nameInput(name){
        
        if(name_regex_input.test(name)){
            console.log("name input")
            return true;
        }
        
        return false;
    }

    function nameValidation(name){
        
        if(name_regex.test(name)){
            return true;
        }
        return false;
    }

    function opportunityValidation(opportunity){

        if(nameValidation(opportunity.name)){
            if(quotaValidation(opportunity.amount)){
                if(description_regex.test(opportunity.description)){
                    if(date_regex.test(opportunity.close_date)){
                        if(opportunity.status){
                            if(opportunity.sales_rep){
                                return true;
                            }
                        }
                    }
                }
            }
        }

    }

    function phoneInput(phone){
        
        const phone_number = removePhoneFormat(phone);

        return phone_regex_input.test(phone_number);

    }



    function formatForBackend(data){

        data.phone = removePhoneFormat(data.phone);

        data.quota = Number(data.quota);

        return data;
    }
    
    

    function phoneNumberValidation(phone){
            
        if(!phone) return false;

            const phone_number = removePhoneFormat(phone);
    
            return phone_regex.test(phone_number);


    }






    function quotaInputValidation(quota){

        const unformatted_quota = removeQuotaFormat(quota);

        return quota_regex_input.test(unformatted_quota);


    }



    function removeLeadingZeros(quota){
        return quota.replace(/^0+/, "");
    }

    function quotaValidation(quota){
        let quota_number = removeQuotaFormat(quota);

        quota_number = removeLeadingZeros(quota_number);

        return quota_regex.test(quota_number);


    }

    function removePhoneFormat(phone){

        if(!phone) return;

        return phone.replace(/-/g, "");
    }

    function removeQuotaFormat(quota){
        let quotaString = String(quota);
        return quotaString.replace(/[,.]/g, "");
    }

    function validSalesRep(salesRep){
        
        const {first_name, last_name, email, phone, role, quota} = salesRep;
        
        if(nameValidation(first_name)){
            if(nameValidation(last_name)){
                if(emailValidation(email)){
                    if(phoneNumberValidation(phone)){
                        if(role){
                            if(quotaValidation(quota)){
                                
                                return true;
                            }
                        }
                    }
                }
            }
        }
        
        return false;
    }

    function hasChanged(salesRep, rep){
            
            const {first_name, last_name, email, phone, role, quota} = salesRep;
            
            if(first_name !== rep.first_name){
                return true;
            }
    
            if(last_name !== rep.last_name){
                return true;
            }
    
            if(email !== rep.email){
                return true;
            }
    
            if(phone !== rep.phone){
                return true;
            }
    
            if(role !== rep.role){
                return true;
            }
    
            return quota !== rep.quota;
    

    }

    function validateSalesRep(salesRep){
        const errors = {};
        const {first_name, last_name, email, phone, role, quota} = salesRep;
        
        if(!nameValidation(first_name)){

            if(!first_name){
                errors["first_name"] = "Required";
            }else{
                errors["first_name"] = "allowed characters are a-z, A-Z";
            }
        }



        if(!nameValidation(last_name)){

            if(!last_name){

                errors["last_name"] = "Required";
            
            }else{

                errors["last_name"] = "allowed characters are a-z, A-Z";
            }
        }

        if(!emailValidation(email)){
            errors["email"] = "invalid email format";
        }

        
        if(!phoneNumberValidation(phone)){
            errors["phone"] = "must be xxx-xxx-xxxx";
        }

        if(!role){
            errors["role"] = "required";
        }

        if(!quotaValidation(quota)){
            errors["quota"] = "required";
        }
        
            
        return errors;
    }
    

    return({
        salesRepInitialState,
        salesRepReducer,
    })
}

export default useSalesRep;