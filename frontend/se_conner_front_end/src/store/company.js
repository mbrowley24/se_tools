import { createSlice } from "@reduxjs/toolkit";
import { json } from "d3";


const companyData = {
    company:{
        name: "",
        id: "",
        vertical: "",
        contacts:{
            empty: true,
            first: false,
            last: false,
            number: 0,
            size: 10,
            numberOfElements: 0,
            totalElements: 0,
            totalPages: 0,
            content: []
        },
        opportunities:{
            empty: true,
            first: false,
            last: false,
            number: 0,
            size: 10,
            numberOfElements: 0,
            totalElements: 0,
            totalPages: 0,
            content: []
        },
        potential_value: 0.00,
        close_percentage: 0,
        
        views:{
            contacts: false,
            opportunities: false
        }
    },
    newCompany:{
        name: "",
        vertical: "",
    },
    page:{
        empty: true,
        first: false,
        last: false,
        number: 0,
        size: 10,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
    },
    categoryData: [],
    companies: [],
    serviceData: [],
    verticalData: [],
    errors : {name: "required", vertical: "required"}    
};


function validName(name){
    const pattern = /^[a-zA-Z0-9\s]{0,75}$/;
    return pattern.test(name);
} 


function checkForErrors(data){
    const errors = {};

    if(!validName(data.name)){
        errors.name = 'Invalid name';
    }

    return errors;
}



const ispSlice = createSlice({
    name: "company",
    initialState: companyData,
    reducers: {
        addCategory(state, action){

        },
        loadVerticals(state, action){

            state.verticalData = [...action.payload];
        },
        newCompany(state, action){

            const errors = {...state.errors};
            const company = {...action.payload};

            //console.log(company);
            if(company.name.length === 0){

                errors['name'] = 'required';
                state.newCompany.name = company.name;
            
            }else if(!validName(company.name)){

                errors['name'] = 'Invalid name';
            
            }else{

                delete errors['name']

                state.newCompany.name = company.name;
            }

            const verticals = [...state.verticalData];

            const filtered = verticals.filter((item) => item.value === company.vertical);
            

            if(company.vertical.length === 0){
                errors['vertical'] = 'required';
                state.newCompany.vertical = company.vertical;

            }else if(filtered.length === 0 && company.vertical.length === 0){
                
                errors['vertical'] = 'Invalid vertical';
                state.newCompany.vertical = "";
            }else{

                delete errors['vertical'];
                state.newCompany.vertical = company.vertical;
            }
            
            
            state.errors = {...errors};

            //console.log(JSON.parse(JSON.stringify(state)));
        },
        newCompanyVertical(state, action){


            const errors = {...state.errors};

            const verticals = [...state.verticalData];

            const vertical = verticals.filter((item) => item.value === action.payload);

            if(vertical.length > 0){
                state.newCompany.vertical = action.payload;
            }else{

                errors['vertical'] = 'Invalid vertical';

                state.errors = {...errors};
            }
        },
        reset(state){

            

            state.newCompany = {...companyData.newCompany};
            state.errors = {...companyData.errors};

            //console.log(JSON.parse(JSON.stringify(state)));
        },
        setCompanies(state, action){

            const data = JSON.parse(JSON.stringify(action.payload));
            console.log(data);
            state.page.empty = data.empty;
            state.page.first = data.first;
            state.page.last = data.last;
            state.page.number = data.number;
            state.page.numberOfElements = data.numberOfElements;
            state.page.totalElements = data.totalElements;
            state.page.totalPages = data.totalPages;
            state.page.size = data.size;

            state.companies = [...data.content];
            //console.log(JSON.parse(JSON.stringify(state)));
        },setCompany(state, action){
                
                const data = JSON.parse(JSON.stringify(action.payload));

                console.log(data);

                state.company = {...data};
                console.log(JSON.parse(JSON.stringify(state)));
        },
        setErrors(state, action){

            state.errors = {...action.payload};

            console.log(JSON.parse(JSON.stringify(state)));
        },setNameExistsError(state, action){

            const errors = {...state.errors};
            const payload = {...action.payload};

            if(payload.update){
                
                errors['exists'] = payload.errors['exists'];
            
            }else{

                delete errors['exists'];
            }

            
            
            state.errors = {...errors};
            //console.log(JSON.parse(JSON.stringify(state)));
        }
    }
});


export const companyActions = ispSlice.actions

export default ispSlice.reducer;