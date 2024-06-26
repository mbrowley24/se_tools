import { createSlice } from "@reduxjs/toolkit";



const forecastData = {
    forecast: [],
};

const forecastSlice = createSlice({
    name: "forecast",
    initialState: forecastData,
    reducers: {
        setForecast(state, action) {
            state.forecast = action.payload;
        },
    },
        
});

export const forecastActions = forecastSlice.actions;
export default forecastSlice.reducer;