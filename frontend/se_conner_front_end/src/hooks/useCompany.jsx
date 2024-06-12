


function useCompany() {

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

    function checkName(name, value){
        
        let companyName = name;

        if(validName(value)){
            companyName = value;
        }

        return companyName;

    }

    return({
        checkForErrors,
        checkName,
        validName
    })
};

export default useCompany;