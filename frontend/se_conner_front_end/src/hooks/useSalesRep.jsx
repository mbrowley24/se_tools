import useGeneral from './useGeneral.jsx'


function useSalesRep() {

    const {emailValidation, nameInputValidation, nameValidation, phoneInput, phoneNumberFormat,
           phoneNumberValidation, quotaInput, quotaValidation, removePhoneFormat, removeQuotaFormat} = useGeneral()

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


    // const name_regex = /^[a-zA-Z]{2,75}$/;
    // const name_regex_input = /^[a-zA-Z]{0,75}$/;
    // const description_regex = /^[a-zA-Z0-9."?()*&%$#@;'"!\/<>,:{}[\]+=_\- :&]{0,255}$/;
    // const phone_regex = /^[0-9]{10}$/;
    // const date_regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    // const phone_regex_input = /^[0-9]{0,10}$/;
    // const quota_regex_input = /^[0-9]{0,15}$/;
    // const quota_regex = /^[0-9]{0,15}$/;
    // const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const salesRepInitialState = {
        sales_rep: {
            id: '',
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            role: "",
            quota: "0.00",
            CSRF: "",
        },
        roles: [],
        sales_reps :[],
        errors: {},

    }



    function salesRepReducer(state, action) {

        const data = JSON.parse(JSON.stringify(state));

        switch (action.type) {

            case "first_name":

                console.log(action.payload)
                if(nameInputValidation(action.payload)){

                    data.sales_rep.first_name = action.payload;

                }

                data.errors = {...checkForErrors(data)}

                return data;

            case 'last_name':

                if(nameInputValidation(action.payload)){
                    data.sales_rep.last_name = action.payload;
                }

                data.errors = {...checkForErrors(data)}

                return data;

            case 'email':

                data.sales_rep.email = action.payload;

                data.errors = {...checkForErrors(data)}

                return data;

            case 'phone':

                if(phoneInput(action.payload)){

                    data.sales_rep.phone = phoneNumberFormat(action.payload);
                }


                data.errors = {...checkForErrors(data)}

                return data;

            case 'role':

                const roles_filter = data.roles.filter((role) => role.value === action.payload);

                if(roles_filter.length === 1){

                    data.sales_rep.role = action.payload;

                }else if(action.payload.length === 0){

                    data.sales_rep.role = action.payload;
                }

                data.errors = {...checkForErrors(data)}

                return data;

            case 'quota':

                if(quotaValidation(action.payload)){

                    data.sales_rep.quota = quotaInput(action.payload)

                }


                data.errors = {...checkForErrors(data)}


                return data;

            case 'roles':

                data.roles = [...action.payload];

                data.errors = {...checkForErrors(data)}
                return data;

            case 'csrf':

                console.log(action.payload)
                data.sales_rep.csrf = action.payload.csrf;

                return data;

            default:
                return state
        }
    }

    function checkForErrors(data){

        const errors = {};

        if(data.sales_rep.first_name.length === 0){

            errors['first_name'] = 'required'

        }else if(data.sales_rep.first_name.length < 2 || data.sales_rep.first_name.length > 75){

            errors['first_name'] = 'must be between 2 and 75 characters'

        }else if(!nameValidation(data.sales_rep.first_name)){

            errors['first_name'] = 'invalid characters'
        }

        if(data.sales_rep.last_name.length === 0){

            errors['last_name'] = 'required'

        }else if(data.sales_rep.last_name.length < 2 || data.sales_rep.last_name.length > 75){

            errors['last_name'] = 'must be between 2 and 75 characters'

        }else if(!nameValidation(data.sales_rep.last_name)){

            errors['last_name'] = 'invalid characters'
        }

        if(!emailValidation(data.sales_rep.email)){

            errors['email'] = 'email invalid';
        }

        if(!phoneNumberValidation(data.sales_rep.phone)){

            errors['phone'] = 'invalid phone number'
        }

        const valid_role = data.roles.filter((role) => role.value === data.sales_rep.role);

        if(valid_role.length === 0){
            errors['role'] = 'required';
        }

        return errors;

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


    function normalizeData(data){

        data.first_name = data.first_name.toLowerCase();
        data.last_name = data.last_name.toLowerCase();
        data.email = data.email.toLowerCase();
        data.phone = removePhoneFormat(data.phone)
        data.quota = removeQuotaFormat(data.quota)

        return data;
    }
    

    return({
        normalizeData,
        salesRepInitialState,
        salesRepReducer,
    })
}

export default useSalesRep;