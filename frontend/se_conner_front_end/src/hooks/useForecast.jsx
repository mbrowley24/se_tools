import {regex_map} from "../helper/general";



function useForecast(){

    const months = [{value:1 , name: "Jan"}, {value: 2, name: "Feb"}, {value: 3, name: "Mar"}, 
                    {value: 4, name: "Apr"}, {value: 5, name: "May"}, {value: 6, name: "Jun"},
                    {value: 7, name: "Jul"}, {value: 8, name: "Aug"}, {value: 9, name: "Sep"},
                    {value: 10, name: "Oct"}, {value: 11, name: "Nov"}, {value: 12, name: "Dec"}
                ];
    
    function years(){

        const year_list = [];
        
        for(let i = 2020; i <= 2040; i++){

            year_list.push({value: i, name: i});
        }

        return year_list;
    }

    function forecastValue(forecast){

        let return_value = 0.00;

        for(let i = 0; i < forecast.length; i++){
            
            return_value += forecast[i].value;
        }

        return return_value;
    }

    function checkForErrors(data){

        const errors = {};

        if(!regex_map.date_regex.test(data.start)){
            
            if(data.start === ""){
            
                errors.start = "required";
            
            }else{
            
                errors.start = "Invalid Date";
            
            }
        }

        if(!regex_map.date_regex.test(data.end)){
            
            if(data.end === ""){

                
                errors.end = "required";
            
            }else{
            
                errors.end = "Invalid Date";
            }
            
        }

        if(data.start.length > 0 && data.end.length > 0){

            if(data.start >= data.end){
                errors.end = "must be greater than Start Date";
            }
        }
        

        if(!data.sales_rep || data.sales_rep === ""){
            errors.sales_rep = "Sales Rep is required";
        }



        return errors;
    }

    function checkForErrorsEdit(data){

        const errors = {};

        if(!regex_map.date_regex.test(data.start)){
            
            if(data.start === ""){
            
                errors.start = "required";
            
            }else{
            
                errors.start = "Invalid Date";
            
            }
        }

        if(!regex_map.date_regex.test(data.end)){
            
            if(data.end === ""){

                
                errors.end = "required";
            
            }else{
            
                errors.end = "Invalid Date";
            }
            
        }

        if(data.start.length > 0 && data.end.length > 0){

            if(data.start >= data.end){
                errors.end = "must be greater than Start Date";
            }
        }
        

        if(!data.sales_rep || data.sales_rep.value === ""){
            errors.sales_rep = "Sales Rep is required";
        }

        

        return errors;
    }

    function sortId(a, b){

        return a.localCompare(b)
    }

    function checkOppStatus(orginal, current){

        if(!orginal || !current){
            return true;
        }

        const sorted_orginal_list = orginal.sort(sortId);
        const sorted_current_list = current.sort(sortId);

        if(orginal.length !== current.length){
            return false;
        }


        if(sorted_orginal_list.length ===  sorted_current_list.length){
            
            for(let i = 0; i < sorted_current_list.length; i++){
                
                if(sorted_current_list[i] !== sorted_current_list[i]){

                    return false;
                }
            
            }
        }

        return true;
    }

    const forecastInitialState = {
        opportunities:{
            content: [],
            first: false,
            last: false,
            number: 0,
            numberOfElements: 0,
        },
        forecast:{
            data:[],
            time_frame:{
                month: 0,
                year: 0,
            },
            value: 0.00,
        },
        sales_rep:{
            value:"",
            name: "",
        },
        value: 0.00,
        current_opps: [],
        original_opps: [],
    };

    
    function checkForChanges(original, current){
        
        if(original.start !== current.start){
            return true;
        }

        if(original.end !== current.end){
            return true;
        }

        if(original.sales_rep.value !== current.sales_rep.value){
            return true;
        }

        if(original.sales_rep.name !== current.sales_rep.name){
            return true;
        }


        return false
    }


    function forecastReducer(state, action){
            
            let data = JSON.parse(JSON.stringify(state));

            switch(action.type){

                case "set_forecast":

                    data = {...action.payload};
                    data.opportunities = {...action.payload.opportunities};
                    data.sales_rep = {...action.payload.sales_rep};
                    data.current_opps = [...action.payload.current_opportunities];
                    data.original_opps = [...action.payload.current_opportunities];
                    data.value = action.payload.value;
                    
                    
                    return data;
                    
                case "add_opportunity":

                    
                    const oppExists = data.current_opps.includes(action.payload);
                    const checkOpp = data.opportunities.content.find((opp)=> opp.id === action.payload);
                    
                    if(checkOpp.length === 0 && checkOpp.length > 1){
                        return data;
                    }

                    if(oppExists){

                        const filteredOpp = data.current_opps.filter((id)=> id !== action.payload);
                        data.current_opps = [...filteredOpp];
                        data.value -= Number(checkOpp.value);
                    
                    }else{


                        data.current_opps.push(action.payload);
                        data.value += Number(checkOpp.value);
                    }

                    return data;

                case "set_time_frame":
                        
                        data.forecast.time_frame = {...action.payload};
                        return data;
                
                case "set_month":
                        data.forecast.time_frame.month = action.payload;
                        return data;

                case "set_year":
                        data.forecast.time_frame.year = action.payload;
                        return data;
                
                case "set_forecast_data":
                        data.forecast.data = [...action.payload];

                        let value = 0.00;
                        for(let i = 0; i < data.forecast.data.length; i++){
                            value += action.payload[i].value;
                        }

                        data.value = value;

                        return data;
                
                case "add_forecast":
                
                    data.forecast.data.push(action.payload);
                    data.forecast.data.sort((a, b)=> a.value - b.value);

                    return data;
                
                case "update_forecast":

                    
                    const forecast = data.forecast.data.filter((item)=> item.id !== action.payload.id);
                    
                    forecast.push(action.payload);
                    forecast.sort((a, b)=> a.value - b.value);
                    data.forecast.data = [...forecast];
                    
                    return data;
                
                case "delete_forecast":

                    const forecast_list = data.forecast.data.filter((item)=> item.id !== action.payload);

                    data.forecast.data = [...forecast_list];
                    
                    data.value = 0.00;

                    for(let i = 0;i < data.forecast.data.length; i++){
                        data.value += data.forecast.data[i].value;
                    }
                    
                    return data;

                default:
                    return state;
            }
    }


    function percentage(value, total){

        const check = isNaN(value) || isNaN(total);

        if(check){
            return 0;
        }

        return Math.round(value / total) * 100;

    };


    return({
        checkOppStatus,
        checkForChanges,
        checkForErrors,
        checkForErrorsEdit,
        forecastInitialState,
        forecastReducer,
        forecastValue,
        months,
        percentage,
        years
    })
}

export default useForecast;