



function useISPService(){

    const FIELDS={
        NAME: "name",
        URL: "url",
        LOAD: "load",
        LOAD_CATEGORIES: "loadCategories",
        ERROR: "error",
        ADD_CATEGORY: "addCategory"
    }


    const serviceInitialState={
        isp:{
            id: "",
            name: "",
            url: ""
        },
        service:{
            id: "",
            name: "",
            url: "",
        },
        errors: {},
        services: []
    }


    function serviceReducer(state, action){

        const data = JSON.parse(JSON.stringify(state));

        switch(action.type){

            case FIELDS.NAME:
                    
                if(action.payload.length <= 100){
                    data.service.name = action.payload;
                }

                data.errors = validateService(data.service);
                return data;
            
            case FIELDS.URL:
                    
                    data.service.url = action.payload;
                    data.errors = validateService(data.service);
                    
                    return data;

            case FIELDS.LOAD:
                        
                        data.service.id = action.payload.id;
                        data.service.name = action.payload.name;
                        data.service.url = action.payload.url;
    
                        data.errors = validateService(data.service);
                        
                        return data;

            case FIELDS.LOAD_CATEGORIES:

                if(action.payload){
                    data.categories = action.payload.length > 0 ? action.payload : [];
                }

                return data;

            
            default:
                return data;
        }
    }



    function addService(data, service){
            
            if(!data || !service){
                return false;
            }
            
            const filteredData = data.filter((item) => item.id !== service.id);
            filteredData.push(service);
            
            return filteredData;
    }

    function checkService(data, name, value){

        if(name === "name" && value.length <= 100){
            
            data[name] = value.substring(0, 100);
            
        }else if(name === "url"){
            data[name] = value;
        }

        return data
        
    }


    function newService(data){

            if(!data){
                return false;
            }
    
            if(data.name.length === 0 || data.url.length === 0){
                
                return false;
            }
            
            return true;
    }


    function updateService(data, newData){

        if(!data || !newData){
            return false;
        }

        if(data.name === newData.name){

            if(data.url === newData.url){
                return false;
            }
        }


        return true;
    }


    function validateService(service){
        let errors = {};

        if(service.name.length === 0){
            errors.name = "Name is required";
        }

        if(service.name.length > 100){
            errors.name = "Name is too long";
        }

        if(service.url.length === 0){
            errors.url = "URL is required";
        }

        return errors;
    }



    return({
        addService,
        checkService,
        serviceInitialState,
        serviceReducer,
        FIELDS,
        newService,
        updateService,
        validateService
    })
}

export default useISPService;