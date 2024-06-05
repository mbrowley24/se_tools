





function useISPCategory(){

    

    function checkCategory(data, category){
        
        if(!data && !category){
            
            return true;
        }

        if(data.name === category.name){
            
            return true;
        }

        return false;
    }

    function validateCategory(category){
        let errors = {};

        // if(category.name.length === 0){
        //     errors.name = "Name is required";
        // }

        if(category.name.length < 3){
            errors.name = "Required: Name should be at least 3 characters";
        }

        if(category.name.length > 100){
            errors.name = "Name should be no more than 100 characters";
        }


        return errors;
    }

    return({
        
        checkCategory,
        validateCategory
    })
}

export default useISPCategory;