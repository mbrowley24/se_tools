


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
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
        quota: "0.00"
    }


    function updateDateSalesRep(salesRep, e){
            
            const {name, value} = e.target;

            const salesRepObj = {...salesRep};

            if(name === "first_name"){
                if(nameInput(value)){
                    salesRepObj[name] = value;
                }
            }else if(name === "last_name"){
                if(nameInput(value)){
                    salesRepObj[name] = value;
                }
            }else if(name === "email"){

                salesRepObj[name] = value;
            
            }else if(name === "phone"){
                
                const phone = removePhoneFormat(value);

                if(phoneInput(phone)){
                    salesRepObj[name] = phoneNumberFormat(phone);
                }

            }else if(name === "role"){

                salesRepObj[name] = value;

            }else if(name === "quota"){
                
                const quota = removeQuotaFormat(value);
                
                if(quotaInputValidation(quota)){
                    
                    salesRepObj[name] = quotaInput(quota);
                }
            }

    
            return salesRepObj;
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
        console.log(quota_number)
        
        if(quota_number.length === 0){
        
            quota_number = "0.00"
        
        }else if(quota_number.length > 0 && quota_number.length === 1){
            
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

    function quotaValidation(quota){
        let quota_string = String(quota);
        const unformatted_quota = removeQuotaFormat(quota_string);

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
    
            if(quota !== rep.quota){
                return true;
            }
    
            return false;
    }

    function validateSalesRep(salesRep){
        const errors = {};
        const {first_name, last_name, email, phone, role, quota} = salesRep;
        
        if(!nameValidation(first_name)){

            if(first_name.length > 0){
                errors["first_name"] = "must be between 2 and 75 characters";
            }
        }

        if(first_name.length > 0 && first_name.length < 2 || first_name.length > 75){
            errors["first_name"] = "must be between 2 and 75 characters";
        }


        if(!nameValidation(last_name)){

            if(last_name.length > 0){
                errors["last_name"] = "allowed characters are a-z, A-Z";
            }
        }

        if(last_name.length > 0 && last_name.length < 2 || last_name.length > 75){
            errors["last_name"] = "must be between 2 and 75 characters";
        }
        
        if(!emailValidation(email) && email.length > 0){
            errors["email"] = "invalid email format";
        }

        if(!phoneNumberValidation(phone)){
            errors["phone"] = "phone number must be 10 digits";
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
        addCommas,
        dateFormat,
        dateValidation,
        descriptionValidation,
        emailValidation,
        formatForBackend,
        formatSalesRep,
        FIELDS,
        hasChanged,
        nameInput,
        nameValidation,
        phoneInput,
        phoneNumberFormat,
        phoneNumberValidation,
        quotaValidation,
        salesRepInitialState,
        updateDateSalesRep,
        validateSalesRep,
        validSalesRep,
    })
}

export default useSalesRep;