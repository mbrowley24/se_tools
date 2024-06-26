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
            console.log(forecast[i].value);
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



    return({
        checkForErrors,
        forecastValue,
        months,
        years
    })
}

export default useForecast;