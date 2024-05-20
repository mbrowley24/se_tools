


function useSalesRep() {
    
    const name_regex = /^[a-zA-Z]{2,75}$/;
    const name_regex_input = /^[a-zA-Z]{0,75}$/;
    const phone_regex = /^[0-9]{10}$/;
    const phone_regex_input = /^[0-9]{0,10}$/;
    const quota_regex_input = /^[0-9]{0,15}$/;
    const quota_regex = /^[0-9]{5,15}$/;
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

    function quotaInput(quota_number){


        quota_number = removeLeadingZeros(quota_number);
        

        if(quota_number.length > 0 && quota_number.length === 1){
            
            quota_number = "0.0" + quota_number;
            console.log(quota_number)
        
        }else if(quota_number.length > 0 && quota_number.length === 2){
            
            quota_number = "0." + quota_number;

        }else if(quota_number.length > 0 && quota_number.length > 2){
            
            
            

            quota_number = quota_number.substring(0, quota_number.length - 2) + "." + quota_number.substring(quota_number.length - 2, quota_number.length);
        }

        return quota_number;

    }

    function quotaInputValidation(quota){
        const quota_number = removeQuotaFormat(quota);
        if(quota_regex_input.test(quota_number)){
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
        assmblySalesRepObj,
        emailValidation,
        nameInput,
        nameValidation,
        phoneInput,
        phoneNumberFormat,
        formatForBackend,
        phoneNumberValidation,
        quotaValidation,
        validSalesRep,
    })
}

export default useSalesRep;