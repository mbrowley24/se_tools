import { configureStore } from "@reduxjs/toolkit";
import ispReducer from "./ispStore";
import salesRepReducer from "./salesRep";



const store = configureStore({
    reducer: {
        ispData: ispReducer,
        salesRepData: salesRepReducer,
    }
});


export default store;