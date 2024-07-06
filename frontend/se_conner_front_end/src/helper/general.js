



const name_regex = /^[a-zA-Z]{2,75}$/;
const meeting_title_regex = /^[a-zA-Z0-9.\\\s\-&]{5,100}$/;
const name_regex_input = /^[a-zA-Z]{0,75}$/;
const description_regex = /^[a-zA-Z0-9."?()*&%$#@;'"!\/<>,:{}[\]+=_\- :&]{0,255}$/;
const phone_regex = /^[0-9]{10}$/;
const date_regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const time_regex = /^[0-9]{2}:[0-9]{2}$/;
const time_regex_long = /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/;
const phone_regex_input = /^[0-9]{0,10}$/;
const quota_regex_input = /^[0-9]{0,15}$/;
const quota_regex = /^[0-9]{0,15}$/;
const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
///^[a-zA-Z0-9."?()*&%$#@;'"!\/<>,:{}[\]+=_\- :&]{5,100}$/;
export const regex_map={
    meeting_title_regex : meeting_title_regex,
    name_regex : name_regex,
    name_regex_input : name_regex_input,
    description_regex : description_regex,
    phone_regex : phone_regex,
    date_regex : date_regex,
    phone_regex_input : phone_regex_input,
    quota_regex_input : quota_regex_input,
    quota_regex : quota_regex,
    email_regex : email_regex,
    time_regex : time_regex,
    time_regex_long : time_regex_long
}


export function addCommas(amount){
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

export function dateValidation(date){

    if(date_regex.test(date)){
        return true;
    }

    return false;
}

export function descriptionValidation(description){
        
        if(description_regex.test(description)){
            return true;
        }

        return false;
}

export function emailValidation(email){

    return email_regex.test(email);
}

export function nameInput(name){
    
    if(name_regex_input.test(name)){
        console.log("name input")
        return true;
    }
    
    return false;
}

export function nameValidation(name){
    
    if(name_regex.test(name)){
        return true;
    }
    return false;
}


export function phoneInput(phone){
        
    const phone_number = removePhoneFormat(phone);

    if(phone_regex_input.test(phone_number)){
        return true;
    }
    return false;
}


export function phoneNumberFormat(phone){

    let phone_number = removePhoneFormat(phone);

    if(phone_number.length >= 7 && phone_number.length < 10){
        
        phone_number = phone_number.substring(0, 3) + "-" + phone_number.substring(3, phone_number.length);

    }else if(phone_number.length === 10){
        
        phone_number = phone_number.substring(0, 3) + "-" + phone_number.substring(3, 6) + "-" + phone_number.substring(6, 10);
    }

    return phone_number;    
}


export function phoneNumberValidation(phone){
            
    const phone_number = removePhoneFormat(phone);

    if(phone_regex.test(phone_number)){
        return true;
    }
    return false;
}

export function quotaInput(quota_number){


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


export function quotaValidation(quota){
    
    let quota_number = removeQuotaFormat(quota);

    quota_number = removeLeadingZeros(quota_number);

    if(quota_regex.test(quota_number)){
        return true;
    }

    return false
}

export function checkDate(dateString){

    const date = new Date(dateString);
    const today = new Date();

    if(date < today){
        return false;
    }

    return true 
};






function removeLeadingZeros(quota){
    return quota.replace(/^0+/, "");
}

export  function removePhoneFormat(phone){
    return phone.replace(/-/g, "");
}

export function removeQuotaFormat(quota){
    let quotaString = String(quota);
    return quotaString.replace(/[,.]/g, "");
}