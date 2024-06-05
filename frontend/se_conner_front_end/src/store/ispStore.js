import { createSlice } from "@reduxjs/toolkit";
import UpdateISP from "../Components/dashboard/edit/UpdateISP";


const ispData = {
    isp:{
        name: "",
        id: "",
    },
    category:{
        name: "",
        id: "",
    },
    ispData: [],
    categoryData: [],
    serviceData: [],    
}


const ispSlice = createSlice({
    name: "isp",
    initialState: ispData,
    reducers: {
        addCategory(state, action) {
            
            const category_list = [...state.categoryData];
            const category = {...action.payload};

            const filter_list = category_list.filter(category=>category.id !== category.id); 
            filter_list.push(category);

            state.categoryData = [...filter_list];
        },
        addISP(state, action) {

            const isp_list = [...state.ispData];

            console.log(JSON.parse(JSON.stringify(action.payload)))

            isp_list.filter(isp=>isp.id !== action.payload.id);

            isp_list.push(action.payload);

            isp_list.sort((a,b)=>a.name - b.name);

            state.ispData = [...isp_list];

        },
        addService(state, action) {
            const service_list = [...state.serviceData];
            const new_service = {...action.payload};

            const filter_list = service_list.filter(service=>service.id !== new_service.id); 
            filter_list.push(new_service);

            state.serviceData = [...filter_list];
            console.log(JSON.parse(JSON.stringify(state)))
        },
        setIspData(state, action) {
            state.ispData = action.payload;
        },
        setCategoryData(state, action) {
            
            const categoryName = action.payload.name;

            state.category.id = action.payload.id;
            state.category.name = categoryName.charAt(0).toUpperCase() + categoryName.slice(1); 
            state.categoryData = action.payload.categories;
        },
        setServiceData(state, action) {
            state.category.id = action.payload.categoryId;
            state.category.name = action.payload.categoryName;
            state.isp.id = action.payload.ispId;
            state.isp.name = action.payload.ispName;
            state.serviceData = action.payload.services;
        },
        updateISP(state, action){
            
            const isp_list = [...state.ispData];
            const isp = {...action.payload};

            const filter_list = isp_list.filter(isp=>isp.id !== isp.id); 
            filter_list.push(isp);

            state.ispData = [...filter_list];

            console.log(JSON.parse(JSON.stringify(state.ispData)))
        }
    }
});

export const ispActions = ispSlice.actions;
export default ispSlice.reducer;
