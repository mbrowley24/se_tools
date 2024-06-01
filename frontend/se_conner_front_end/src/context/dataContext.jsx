import { createContext, useReducer } from "react";


const DataContext = createContext();

const FIELDS = {
    QUOTA: 'quota',
    ADMIN: "admin"
}

const initialState = {
    quota: 0,
    admin: false
}

const reducer = (state, action) => {
    
    switch(action.type){
        
        case FIELDS.QUOTA:
        
            return {...state, quota: action.payload}

        case FIELDS.ADMIN:
                return {...state, admin: action.payload}
        default:
            return state;
    }
};


export const AppDataContext = ({children}) => {
    const [userdata, dispatchUser] = useReducer(reducer, initialState);
    
    
    return(
        <DataContext.Provider value={{userdata, dispatchUser, FIELDS}}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;