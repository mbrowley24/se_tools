import {} from './useGeneral.jsx'


function useContact(){

    function checkForErrors(data){
        let errors = {};

        if(!regex_map.name_regex.test(data.first_name)){

            errors['first_name'] = 'Required: min of two alphanumeric characters';
        }


        if(!regex_map.name_regex.test(data.last_name)){
            
            errors['last_name'] = 'Required: min of two alphanumeric characters';
        }


        if(!emailValidation(data.email)){
            errors['email'] = 'Required: valid email';
        }

        if(!phoneNumberValidation(data.phone)){
            errors['phone'] = 'Required: valid phone number';
        }


        if(!checkTitle(data.title)){
            
            errors['title'] = 'Required: min of two alphanumeric characters';
        }

        return errors
    }


    function change(original, updated){

        if(original.first_name !== updated.first_name){

            return true;

        }else if(original.last_name !== updated.last_name){

            return true;

        }else if(original.email !== updated.email){
            
            return true;
        
        }else if(original.phone !== updated.phone){

            return true;

        }else if(original.title !== updated.title){

            return true;
        }

        return false;
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



    const contactState ={
        id: "",
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

                return data;

            case 'last_name':
                
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
                

                if(checkTitleInput(action.payload)){
                    data.title = action.payload;
                }

                return data;
            
            case 'reset':
                return contactState;

            case "update":
                data.title = action.payload.title;
                data.first_name = action.payload.first_name;
                data.last_name = action.payload.last_name;
                data.email = action.payload.email;
                data.phone = action.payload.phone;
                data.id = action.payload.id;
                
                return data;


            default:
                return state
        }
    }


    return({
        change,
        checkName,
        checkForErrors,
        checkEmail,
        checkTitle,
        contactReducer,
        contactState,
    })

}

export default useContact;