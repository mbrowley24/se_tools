import { configureStore } from "@reduxjs/toolkit";
import ispReducer from "./ispStore";
import salesRepReducer from "./salesRep";
import companyReducer from "./company";


const store = configureStore({
    reducer: {
        ispData: ispReducer,
        salesRepData: salesRepReducer,
        companyData: companyReducer,
    }
});


export default store;