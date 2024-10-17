import { useSelector } from "react-redux";
import useGeneral  from './useGeneral.jsx';


function useCompany() {
    const {nameInputValidation, nameValidation} = useGeneral();


    function checkForErrors(data){
        const errors = {};

        if(data.company.name.trim().length < 2){

            errors['name'] = 'required';

        }else if(nameInputValidation(data.name)){
            
            errors['name'] = '- % . only special character allowed';
        }

        if(data.company.industry.trim().length === 0){

            errors['industry'] = 'required';

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

            
            case 'setup':
                const setupData = {...action.payload}; 
                data.id = setupData.id? setupData.id : "";
                data.company.name = setupData.name;
                data.company.industry = setupData.industry;
                data.contacts = setupData.contacts? setupData.contacts : [];
                data.updated = setupData.updated;
                
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