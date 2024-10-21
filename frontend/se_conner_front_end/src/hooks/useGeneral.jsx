






function useGeneral() {



    const name_regex = /^[a-zA-Z0-9.\\\s\-]{2,75}$/;
    const name_regex_input = /^[a-zA-Z0-9.\\\s\-]{0,75}$/;
    const company_name_regex = /^[a-zA-Z0-9.\\\s\-&]{2,75}$/;
    const company_name_regex_input = /^[a-zA-Z0-9.\\\s\-&]{0,75}$/;
    const meeting_title_regex = /^[a-zA-Z0-9.\\\s\-&]{5,100}$/;
    const description_regex = /^[a-zA-Z0-9\s.,!?%&@'"\-:;/]{0,500}$/;
    const phone_regex = /^[0-9]{10}$/;
    const date_regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    const time_regex = /^[0-9]{2}:[0-9]{2}$/;
    const time_regex_long = /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/;
    const phone_regex_input = /^[0-9]{0,10}$/;
    const quota_regex_input = /^[0-9]{0,15}$/;
    const quota_regex = /^[0-9]{0,15}$/;
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    const regex_map={
        date_regex : date_regex,
        description_regex : description_regex,
        email_regex : email_regex,
        meeting_title_regex : meeting_title_regex,
        name_regex : name_regex,
        name_regex_input : name_regex_input,
        phone_regex : phone_regex,
        phone_regex_input : phone_regex_input,
        quota_regex_input : quota_regex_input,
        quota_regex : quota_regex,
        time_regex : time_regex,
        time_regex_long : time_regex_long
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

        return name_regex_input.test(name);


    }

    function companyNameValidation(name){

        return company_name_regex.test(name);
    }

    function nameValidation(name){

        return name_regex.test(name);

    }

    function nameInputValidation(name){

        return name_regex_input.test(name);
    }

    function companyNameInputValidation(name){
        return company_name_regex_input.test(name);
    }


    function phoneInput(phone){

        const phone_number = removePhoneFormat(phone);

        return phone_regex_input.test(phone_number);

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


    function phoneNumberValidation(phone){

        const phone_number = removePhoneFormat(phone);

        return phone_regex.test(phone_number);

    }

    function quotaInput(quota_number){


        quota_number = removeLeadingZeros(quota_number);

        quota_number = removeQuotaFormat(quota_number);

        if(quota_number.length === 0){

            quota_number = "0.00"

        }else if(quota_number.length > 0 && quota_number.length === 1){

            quota_number = "0.0" + quota_number;


        }else if(quota_number.length > 0 && quota_number.length === 2){

            quota_number = "0." + quota_number;

        }else if(quota_number.length > 0 && quota_number.length > 2){




            quota_number = quota_number.substring(0, quota_number.length - 2) + "." + quota_number.substring(quota_number.length - 2, quota_number.length);
        }

        return addCommas(quota_number);

    }


    function quotaValidation(quota){

        let quota_number = removeQuotaFormat(quota);

        quota_number = removeLeadingZeros(quota_number);

        return quota_regex.test(quota_number);


    }

    function checkDate(dateString){

        const date = new Date(dateString);
        const today = new Date();

        return date >= today;


    }





    function formatDate(dateString){
        const date = new Date(dateString);

        return date.toLocaleDateString('en-us', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        })
    }

    function removeLeadingZeros(quota){
        return quota.replace(/^0+/, "");
    }

    function removePhoneFormat(phone){
        return phone.replace(/-/g, "");
    }

    function removeQuotaFormat(quota){
        let quotaString = String(quota);
        return quotaString.replace(/[,.]/g, "");
    }

    return({
        companyNameInputValidation,
        companyNameValidation,
        descriptionValidation,
        emailValidation,
        formatDate,
        nameValidation,
        nameInputValidation,
        phoneInput,
        phoneNumberFormat,
        phoneNumberValidation,
        quotaInput,
        quotaValidation,
        regex_map,
        removeQuotaFormat,
        removePhoneFormat
    })
}


export default useGeneral;