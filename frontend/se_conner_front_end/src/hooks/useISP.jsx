import { useReducer } from "react";





function useISP() {



    function checkForErrors(data){
        let errors = {}
        if(data.name === ""){
            errors.name = "Name is required";
        }

        if(!nameLength(data.name)){
            errors.name = "Name must be 100 characters or less";
        }

        if(data.url === ""){
            errors.url = "URL is required";
        }


        return errors;
    }


    function nameLength(text){

        if(!text) return true;
        
        return text.length <= 100;
    }

    function ispObjFilter(name, value, obj){

        if(name === "name"){
            
            if(nameLength(value)){
                obj[name] = value;
            }
        
        }else{
            obj[name] = value;
        
        }


        return obj;

    }

    function duplicateName(value, errors){
        
        if(value){
            errors.name = "Name already exists";
        }

        return errors;
    }

    function duplicateNameCurrentValue(current, name, value, errors){

        if(!name || name.length === 0) return errors;

        if(current !== name && value){
            
            errors.name = "Name already exists";
        }

        return errors;

    }

    function duplicateURL(value, errors){
        
        if(value){
            errors.url = "Url already exists";
        }

        return errors;
    }

    function duplicateNameCurrentUrl(current, url, value, errors){
        
        if(!url || url.length === 0) return errors;

        if(current !== url && value){
        
            errors.url = "Url already exists";
        }

        return errors;
    }

    function duplicateMap(value, errors){
        
        if(value){
            errors.mapExists = "Maps already exists";
        }

        return errors;
    }

    function duplicateNameCurrentMap(current, map, value, errors){
        
        if(!map || map.length === 0) return errors;

        if(current !== map && value){
        
            errors.maps = "Maps already exists";
        }

        return errors;

    }

    function ispUpdate(data, newData){
        
        if(data.name === newData.name){
            
            if(data.url === newData.url){
                
                if(data.maps === newData.maps){
                    
                    return false;
                }
            }
        }

        return true;
    }

    function validUpdate(data){
        
        if(data.name === "" || data.url === ""){
            return false;
        }

        return true;
    }


    function removeHttp(url){
        return url.replace(/^https?:\/\//, '');
    }
    

    return({
        checkForErrors,
        duplicateName,
        duplicateNameCurrentValue,
        duplicateURL,
        duplicateNameCurrentUrl,
        duplicateMap,
        duplicateNameCurrentMap,
        ispObjFilter,
        ispUpdate,
        validUpdate,
    })
    
}

export default useISP;