import { name_regex, emailValidation, phoneInput, phoneNumberValidation} from '../helper/general';


function useContact(){

    function checkForErrors(data){
        let errors = {};

        if(!name_regex.test(data.first_name)){

            errors['first_name'] = 'Required: min of two alphanumeric characters';
        }


        if(!name_regex.test(data.last_name)){
            
            errors['last_name'] = 'Required: min of two alphanumeric characters';
        }


        if(!emailValidation(data.email)){
            errors['email'] = 'Required: valid email';
        }

        if(!phoneNumberValidation(data.phone)){
            errors['phone'] = 'Required: valid phone number';
        }

        console.log(data);
        console.log(checkTitle(data.title));

        if(!checkTitle(data.title)){
            console.log('title error');
            errors['title'] = 'Required: min of two alphanumeric characters';
        }

        return errors
    }

    function checkName(name){
        
        const pattern = /^[a-zA-Z0-9\s]{0,75}$/;

        return pattern.test(name);
    }


    function checkTitle(title){
        
        const title_pattern = /^[a-zA-Z0-9\s]{2,50}$/;
        return title_pattern.test(title.trim());
    }


    function checkTitleInput(title){
                
        const pattern = /^[a-zA-Z0-9\s]{0,50}$/;

        return pattern.test(title);
    }


    function checkEmail(email){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailRegex.test(email);
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



    const contactState ={
        first_name:'',
        last_name:'',
        email:'',
        phone:'',
        title:''
    }

    function contactReducer(state, action) {

        const data = JSON.parse(JSON.stringify(state));

        switch (action.type) {
    
            case 'first_name':

                const first_name = action.payload;
                
                if(checkName(first_name)){
                    
                    data.first_name = first_name;
                }

                console.log(data);
                return data;

            case 'last_name':
                console.log(action.payload);
                const last_name = action.payload;

                if(checkName(last_name)){
                    
                    data.last_name = last_name;
                }

                return data;

            case 'email':
                
                data.email = action.payload;
                
                return data;

            case 'phone':

                const unformatted_phone = removePhoneFormat(action.payload);

                if(phoneInput(unformatted_phone)){
                    data.phone = phoneNumberFormat(unformatted_phone);
                }

                return data;

            case 'title':
                console.log(action.payload);

                if(checkTitleInput(action.payload)){
                    data.title = action.payload;
                }
                console.log(data)

                return data;


            default:
                return state
        }
    }


    return({
        checkName,
        checkForErrors,
        checkEmail,
        checkTitle,
        contactReducer,
        contactState,
        phoneNumberFormat
    })

}

export default useContact;