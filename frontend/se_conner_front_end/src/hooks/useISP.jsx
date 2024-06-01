import { useReducer } from "react";





function useISP() {

    const FIELDS = {
        ISPS: "isps", 
        MAPS: "maps",
        NAME: "name",
        UPDATE: "update",
        URL: "url",
        LOAD: "load",

    }

    const initialState = {
        isp:{
            id: "",
            name: "",
            url: "",
            maps: "",
            categories: 0,
        },
        update: false,
        isps: [],
    }

    function nameLength(text){
        return text.length <= 100;
    }

    const ispReducer = (state, action) => {

        const data = JSON.parse(JSON.stringify(state));

        switch(action.type){

            case FIELDS.NAME:
                
                if(nameLength(action.payload)){
                    data.isp.name = action.payload;
                }
                return data;

            case FIELDS.URL:
                
                data.isp.url = action.payload;
                
                return data;

            case FIELDS.MAPS:
                
                data.isp.maps = action.payload;
                
                return data;

            case FIELDS.UPDATE:

                const current_isps = [...data.isps]; 
                console.log(current_isps)
                const filtered_isps = data.isps.filter((isp) => isp.id !== action.payload.id);
                console.log(filtered_isps)
                const current_ips_length = current_isps.length;
                const filtered_isps_length = filtered_isps.length;

                if(current_ips_length > filtered_isps_length){
                    data.isps = [...filtered_isps, action.payload];
                }
                
                
                return data;

            case FIELDS.ISPS:

                if(action.payload){
                    data.isps = [...action.payload];
                }

                return data;

            case FIELDS.LOAD:

                if(!action.payload){
                    return data
                }
                data.isp.id = action.payload.id;
                data.isp.name = action.payload.name;
                data.isp.url = action.payload.url;
                data.isp.maps = action.payload.maps;
                data.isp.categories = action.payload.categories;
                
                return data;

            default:
                return state;
        }
    }

    function ispUpdate(data, newData){
        
        if(data.isp === newData.isp){
            
            if(data.isp === newData.isp){
                
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

    return({
        FIELDS,
        initialState,
        ispReducer,
        ispUpdate,
        validUpdate,
    })
    
}

export default useISP;