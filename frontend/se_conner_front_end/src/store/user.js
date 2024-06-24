import { createSlice } from "@reduxjs/toolkit";



const userData = {
    admin: false
};

const userSlice = createSlice({
    name: "user",
    initialState: userData,
    reducers: {
        setAdmin(state, action){
            state.admin = action.payload;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;