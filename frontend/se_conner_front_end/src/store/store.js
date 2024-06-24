import { configureStore } from "@reduxjs/toolkit";
import ispReducer from "./ispStore";
import salesRepReducer from "./salesRep";
import companyReducer from "./company";
import userReducer from "./user";

const store = configureStore({
    reducer: {
        ispData: ispReducer,
        salesRepData: salesRepReducer,
        companyData: companyReducer,
        userData: userReducer,
    }
});


export default store;