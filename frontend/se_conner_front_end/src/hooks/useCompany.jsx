import { useSelector } from "react-redux";


function useCompany() {
    const verticalData = useSelector((state) => state.companyData.verticalData);
    function validName(name){
        const pattern = /^[a-zA-Z0-9\s]{0,75}$/;
        return pattern.test(name);
    } 

    function checkForErrors(name){
        const errors = {};

        if(!validName(name)){
            errors.name = 'Invalid name';
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

    function changeCompany(company){
        const companyObj = {...company};
        

        if(validName(companyObj.name.trim())){
            
            delete companyObj.errors['name']

        }else if(companyObj.name === ''){

            companyObj.errors['name'] = 'required';
        
        }else{
            companyObj.errors['name'] = 'Invalid name alphanumeric characters only';
        }

        const filterVertical = verticalData.filter((item) => item.value === companyObj.vertical);

        if(companyObj.vertical.length === 0){

            companyObj.errors['vertical'] = 'required';

        }else if(filterVertical.length === 0){
            
            companyObj.errors['vertical'] = 'Invalid vertical';

        }else{

            delete companyObj.errors['vertical'];
        }

        console.log(companyObj);
        return companyObj
    }

    

    return({
        changeCompany,
        checkForErrors,
        checkName,
        detectChange,
        validName
    })
};

export default useCompany;