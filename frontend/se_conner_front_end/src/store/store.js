import { configureStore } from "@reduxjs/toolkit";
import ispReducer from "./ispStore";


const store = configureStore({
    reducer: {
        ispData: ispReducer,
    }
});


export default store;