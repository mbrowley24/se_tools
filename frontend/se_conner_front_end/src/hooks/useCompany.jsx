import { useSelector } from "react-redux";


function useCompany() {
    const verticalData = useSelector((state) => state.companyData.verticalData);
    function validName(name){
        const pattern = /^[a-zA-Z0-9\s]{2,75}$/;
        return pattern.test(name);
    } 

    function validCharacters(name){
        const pattern = /^[a-zA-Z0-9\s]{0,75}$/;
        return pattern.test(name);
    }

    function checkForErrors(data){
        const errors = {};

        if(data.name.trim().length < 2){
            errors['name'] = 'required';

        }else if(!validName(data.name)){
            
            errors['name'] = 'Invalid name';
        }

        const filteredVertical = verticalData.filter((vertical)=> vertical.value === data.vertical);

        if(data.vertical.trim().length === 0){

            errors['vertical'] = 'required';

        }else if(filteredVertical.length === 0){
            errors['vertical'] = 'Invalid vertical';
        }


        return errors;
    }

    function detectChange(orginal, edited){

        if(!orginal) return false;
        if(!edited) return false;

        if(orginal.name !== edited.name){
            return true;
        }

        if(orginal.vertical !== edited.vertical){
            return true;
        }

        return false;
    }

    function checkName(name, value){
        
        let companyName = name;

        if(validName(value)){
            companyName = value;
        }

        return companyName;

    }

    const initalCompnayState ={
        id: "",
        name: '',
        vertical: '',
        opportunities: 0,
        contacts: 0,
        percentage: 0,
        open: 0,
        updated: 0,
        errors:{}
    }

    function companyReducer(state, action){

        const data = JSON.parse(JSON.stringify(state)); 

        switch(action.type){
            case 'name':
                
                const name = action.payload;

                if(validCharacters(name)){
                    
                    if(name.trim().length > 0){
                        data.name = name;
                    }
                }

                data.errors = {...checkForErrors(data)};

                return data;
            
            case 'vertical':
                
                const vertical = action.payload;
                
                const filter = verticalData.filter((item)=> item.value === vertical);

                if(filter.length > 0){
                    data.vertical = vertical;
                }

                data.errors = {...checkForErrors(data)};

                return data;
            

            
            case 'duplicate':

                const duplicateData = {...action.payload};
                
                if(duplicateData.update){

                    if(duplicateData.og_name === data.name){
                    
                        delete data.errors['exists'];
                    
                    }else{

                        data.errors['exists'] = duplicateData.errors['exists'];
                    }

                }else{
                    
                    delete data.errors['exists'];
                }


                return data;
            
            case 'setup':
                const setupData = {...action.payload}; 
                data.id = setupData.id;
                data.name = setupData.name;
                data.vertical = setupData.vertical;
                data.opportunities = setupData.opportunities;
                data.contacts = setupData.contacts;
                data.percentage = setupData.percentage;
                data.open = setupData.open;
                data.updated = setupData.updated;
                
                return data;
            default:
                return state;
        }
    }

    function duplicateName(orginalCompany, company, payload){

        if(!orginalCompany) return company;

        const companyObj = {...company};

        if(payload.update){

            if(orginalCompany.name === company.name){
                
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
        checkName,
        companyReducer,
        detectChange,
        duplicateName,
        initalCompnayState,
        validName
    })
};

export default useCompany;