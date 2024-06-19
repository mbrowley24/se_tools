import { createSlice } from "@reduxjs/toolkit";



const sales_rep_data = {
    roles: [],
    reps:[],
    quota: 0.00,
    page: 0,
    limit: 10,
    first: false,
    last: false,
    empty: true,
    number_elements: 0,
    total_elements: 0,
    total_pages: 0,
    deleteRep: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        id: "",
        role: "",
    }

}


const salesRepSlice = createSlice({
    name: "salesRep",
    initialState: sales_rep_data,
    reducers: {
        addRep(state, action) {
            const rep_list = [...state.reps];
            const new_rep = {...action.payload};
            const filter_list = rep_list.filter(rep=>rep.id !== new_rep.id); 
            filter_list.push(new_rep);
            state.reps = [...filter_list];
        },
        addReps(state, action) {

            state.empty = action.payload.empty;
            state.first = action.payload.first;
            state.last = action.payload.last;
            state.number_elements = action.payload.numberOfElements;
            state.total_elements = action.payload.totalElements;
            state.total_pages = action.payload.totalPages;

            if(action.payload.content){
                
                if(action.payload.content.length > 0){

                    state.reps = [...action.payload.content];


                }
            }

            let quota = 0;

            for(let i = 0; i < state.reps.length; i++){
                
                quota += state.reps[i].quota;
            }

            state.quota = quota;
            
        },
        deleteRep(state, action) {
            
            const rep_list = [...state.reps];
            
            const filter_list = rep_list.filter(rep=>rep.id !== action.payload); 
            
            state.reps = [...filter_list];

            let quota = 0;
            for(let i = 0; i < state.reps.length; i++){
                state.quota += state.reps[i].quota;
            }

            state.quota = quota;

        },
        newRep(state, action) {

            const reps = [...state.reps, action.payload];

            reps.sort((a,b) => a.last_name.localeCompare(b.last_name));

            state.reps = [...reps];

            let quota = 0;
            for(let i = 0; i < state.reps.length; i++){

                quota += state.reps[i].quota;
            
            }

            state.quota = quota;

        },
        setLimit(state, action) {
            state.limit = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setQuota(state, action) {
            state.quota = action.payload;
        },
        setReps(state, action) {
            console.log(action.payload)
            state.reps = [...action.payload];
        },
        setRoles(state, action) {
            state.roles = action.payload;
        }
    }
});

export const salesRepActions = salesRepSlice.actions;
export default salesRepSlice.reducer;