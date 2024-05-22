


function useSalesRep() {
    
    const name_regex = /^[a-zA-Z]{2,75}$/;
    const name_regex_input = /^[a-zA-Z]{0,75}$/;
    const description_regex = /^[a-zA-Z0-9."?()*&%$#@;'"!\/<>,:{}[\]+=_\- :&]{0,255}$/;
    const phone_regex = /^[0-9]{10}$/;
    const date_regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    const phone_regex_input = /^[0-9]{0,10}$/;
    const quota_regex_input = /^[0-9]{0,15}$/;
    const quota_regex = /^[0-9]{4,15}$/;
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 

    function assmblySalesRepObj(salesRep, value, name){

        const salesRepObj = {...salesRep};
        
        switch(name){

            case "first_name":
                
                if(nameInput(value)){
                    salesRepObj[name] = value;
                }
                return salesRepObj;

            case "last_name":

                if(nameInput(value)){
                    salesRepObj[name] = value;
                }
                return salesRepObj;
            
            case "email":
                
                salesRepObj[name] = value;
                return salesRepObj;

            case "phone":
                
                const unformatted_phone = removePhoneFormat(value);

                if(phoneInput(unformatted_phone)){
                    salesRepObj[name] = phoneNumberFormat(unformatted_phone);
                }
                
                return salesRepObj;

            case "role":
                    
                    salesRepObj[name] = value;

                    return salesRepObj;

            case "quota":
                    
                const quota = removeQuotaFormat(value);
                
                if(quotaInputValidation(quota)){
                    
                    salesRepObj[name] = quotaInput(quota);
                }

                return salesRepObj;
                    
            default:
                return salesRepObj;
        }
        
    }

    const FIELDS ={
        AMOUNT: "amount",
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
        UPDATE: "update"
    }


    const initialState = {
        name: "",
        amount: "",
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
                if(name_regex_input.test(name)){
                    data.name = name;
                }

                return data;

            case FIELDS.AMOUNT:
        
                const quota = removeQuotaFormat(action.payload);
                
                
                if(quotaInputValidation(quota)){

                    const formatted_quota = quotaInput(quota);
                    

                    data.amount = addCommas(formatted_quota);
                }


                return data;    

            case FIELDS.DESCRIPTION:
                    
                const description = action.payload;

                if(description_regex.test(description)){
                    data.description = description;
                }

                return data;
            
            case FIELDS.CLOSE:

                if(date_regex.test(action.payload)){
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
                
                data.name = action.payload.name;
                data.amount = action.payload.amount;
                data.status = action.payload.status;
                data.close_date = dateFormat(action.payload.close_date);
                data.sales_rep = action.payload.sales_rep;
                data.updated = dateFormat(action.payload.updated_at);
                return data;
            default:
                return data;
        }
    }

    function dateFormat(date){

        return date.split("T")[0];
    }

    function dateValidation(date){

        if(date_regex.test(date)){
            return true;
        }

        return false;
    }

    function descriptionValidation(description){
            
            if(description_regex.test(description)){
                return true;
            }
    
            return false;
    }

    function emailValidation(email){

        return email_regex.test(email);
    }

    function nameInput(name){
        
        if(name_regex_input.test(name)){
            
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

        if(phone_regex_input.test(phone_number)){
            return true;
        }
        return false;
    }

    function phoneNumberFormat(phone){

        let phone_number = removePhoneFormat(phone);

        if(phone_number.length >= 7 && phone_number.length < 10){
            
            phone_number = phone_number.substring(0, 3) + "-" + phone_number.substring(3, phone_number.length);

        }else if(phone_number.length === 10){
            
            phone_number = phone_number.substring(0, 3) + "-" + phone_number.substring(3, 6) + "-" + phone_number.substring(6, 10);
        }

        return phone_number;    
    }

    function formatForBackend(data){

        data.phone = removePhoneFormat(data.phone);

        data.quota = Number(data.quota);

        return data;
    }
    
    

    function phoneNumberValidation(phone){
            
            const phone_number = removePhoneFormat(phone);
    
            if(phone_regex.test(phone_number)){
                return true;
            }
            return false;
    }

    function addCommas(amount){
        let amountString = String(amount);

        if(!amountString ){
            return
        }

        if(!amountString.includes(".")){
            amountString += ".00";
        }

        const number_string = amountString.split("").reverse();

        const commas = [6, 9, 12, 15, 18]

        const new_number = [];

        for(let i = 0; i < number_string.length; i++){
            
            
            if(commas.includes(i)){
                new_number.push(",");
            }

            new_number.push(number_string[i]);
        }
        return new_number.reverse().join("");
    }

    function quotaInput(quota_number){


        quota_number = removeLeadingZeros(quota_number);

        if(quota_number.length > 0 && quota_number.length === 1){
            
            quota_number = "0.0" + quota_number;
            
        
        }else if(quota_number.length > 0 && quota_number.length === 2){
            
            quota_number = "0." + quota_number;

        }else if(quota_number.length > 0 && quota_number.length > 2){
            
            
            

            quota_number = quota_number.substring(0, quota_number.length - 2) + "." + quota_number.substring(quota_number.length - 2, quota_number.length);
        }

        return quota_number;

    }


    function quotaInputValidation(quota){

        const unformatted_quota = removeQuotaFormat(quota);

        if(quota_regex_input.test(unformatted_quota)){
            return true;
        }

        return false
    }

    function removeLeadingZeros(quota){
        return quota.replace(/^0+/, "");
    }

    function quotaValidation(quota){
        let quota_number = removeQuotaFormat(quota);

        quota_number = removeLeadingZeros(quota_number);

        if(quota_regex.test(quota_number)){
            return true;
        }

        return false
    }

    function removePhoneFormat(phone){
        return phone.replace(/-/g, "");
    }

    function removeQuotaFormat(quota){
        return quota.replace(/[,.]/g, "");
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

    

    return({
        addCommas,
        assmblySalesRepObj,
        dateFormat,
        dateValidation,
        descriptionValidation,
        emailValidation,
        formatForBackend,
        FIELDS,
        initialState,
        nameInput,
        nameValidation,
        phoneInput,
        phoneNumberFormat,
        opportunityReducer,
        phoneNumberValidation,
        quotaValidation,
        validSalesRep,
    })
}

export default useSalesRep;