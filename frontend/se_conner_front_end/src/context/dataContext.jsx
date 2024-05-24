import { createContext, useReducer } from "react";


const DataContext = createContext();

const FIELDS = {
    QUOTA: 'quota',
}

const initialState = {
    quota: 0,
}

const reducer = (state, action) => {
    
    switch(action.type){
        
        case FIELDS.QUOTA:
        
        return {...state, quota: action.payload}
        default:
            return state;
    }
};


export const AppDataContext = ({children}) => {
    const [userdata, dispatchUser] = useReducer(reducer, initialState);
    
    const FIELDS = {
        QUOTA: 'quota',
    }
    
    return(
        <DataContext.Provider value={{userdata, dispatchUser, FIELDS}}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;