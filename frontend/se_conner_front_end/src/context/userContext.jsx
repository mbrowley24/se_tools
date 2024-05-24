import { createContext, useReducer } from "react";


const UserContext = createContext();

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

export const UserData = ({children}) => {
    
    const [userdata, dispatchUser] = useReducer(reducer, initialState);

    return(
        <UserContext.Provider value={{userdata, dispatchUser}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;