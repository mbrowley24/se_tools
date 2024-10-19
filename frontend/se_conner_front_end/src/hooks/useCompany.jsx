import { useSelector } from "react-redux";
import useGeneral  from './useGeneral.jsx';
import error from "eslint-plugin-react/lib/util/error.js";


function useCompany() {
    const {nameInputValidation, nameValidation, descriptionValidation} = useGeneral();


    function checkForErrors(data){
        const errors = {};

        if(data.company.name.trim().length < 2){

            errors['name'] = 'required';

        }else if(!nameValidation(data.name)){
            
            errors['name'] = '- % . only special character allowed';

        }else{

            delete error['name']
        }

        const industries = data.industries ? [...data.industries] : [];

        const industry_filter = industries.filter((industry) => industry.value === data.company.industry)

        if(data.company.industry.trim().length === 0){

            errors['industry'] = 'required';


        }else if (industry_filter.length === 0){

            errors['industry'] = 'invalid selection';

        }else{

            delete errors['industry']
        }

        const sales_rep = data.sales_rep? [...data.sales_rep] : [];
        const sales_rep_filter = sales_rep.filter((sales_rep) => sales_rep.value === data.company.sales_rep)

        if(sales_rep.length === 0){
            errors['sales_rep'] = 'required';

        }else if (sales_rep_filter.length === 0){

            errors['sales_rep'] = "invalid"
        }else{

            delete errors['sales_rep']
        }


        if(data.company.notes.length > 500){

            errors['notes'] = 'Error: more than 500 characters'

        }else if(!descriptionValidation(data.company.notes)){

            errors['notes'] = "in valid character"
        }else{

            delete errors['notes']
        }

        return errors;
    }

    function detectChange(original, edited){

        if(!original) return false;
        if(!edited) return false;

        if(original.name !== edited.name){
            return true;
        }

        return original.vertical !== edited.vertical;


    }

    const initialCompanyState ={
        company:{
            id: "",
            name: '',
            industry: '',
            sales_rep: '',
            notes : '',
        },
        industries: [],
        sales_reps: [],
        errors:{}
    }

    function companyReducer(state, action){

        const data = JSON.parse(JSON.stringify(state)); 

        switch(action.type){
            case 'name':
                
                const name = action.payload;

                if(nameInputValidation(name.trim())){

                    data.company.name = name;
                }

                data.errors = {...checkForErrors(data)};

                return data;
            
            case 'industry':
                
                const industryId = action.payload;

                const filter = data.industries.filter((industry) => industry.value === industryId);

                if(filter.length > 0){
                    data.company.industry = industryId;
                }

                data.errors = {...checkForErrors(data)};

                return data;

                case 'sales_rep':

                    data.company.sales_rep = action.payload;

                    if(data.company.sales_rep.length === 0){
                        data.errors['sales_rep'] = 'Required';

                    }else{

                        delete data.errors['sales_rep'];
                    }
                    data.errors = {...checkForErrors(data)};
                    return data;

            case 'form_data':
                console.log(action.payload)
                const industryList = action.payload.form_data.industries? [...action.payload.form_data.industries] : [];
                const sales_repList = action.payload.form_data.sales_reps? [...action.payload.form_data.sales_reps] : [];
                data.industries = [...industryList];
                data.sales_reps = [...sales_repList];
                data.errors = {...checkForErrors(data)};
                return data;

            case 'notes':

                const notes = action.payload;

                if(descriptionValidation(notes)){
                    data.company.notes = action.payload;
                }
                data.errors = {...checkForErrors(data)};
                return data;

            case 'setup':
                const setupData = {...action.payload}; 
                data.id = setupData.id? setupData.id : "";
                data.company.name = setupData.name;
                data.company.industry = setupData.industry;
                data.contacts = setupData.contacts? setupData.contacts : [];
                data.updated = setupData.updated;
                data.errors = {...checkForErrors(data)};
                return data;
            default:
                return state;
        }
    }

    function duplicateName(originalCompany, company, payload){

        if(!originalCompany) return company;

        const companyObj = {...company};

        if(payload.update){

            if(originalCompany.name === company.name){
                
                delete companyObj.errors['exists'];

            }else{
                companyObj.errors['exists'] = 'Name already exists';
            }
        
        }else{
        
            delete companyObj.errors['exists'];
        
        }
        
        return companyObj;
    }
    

    return({
        checkForErrors,
        companyReducer,
        detectChange,
        duplicateName,
        initialCompanyState,
    })
};

export default useCompany;