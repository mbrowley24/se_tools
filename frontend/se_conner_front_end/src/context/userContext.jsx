import { createContext, useReducer } from "react";


const UserContext = createContext();

const FIELDS = {
    QUOTA: 'quota',
    ADMIN: false
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

export const UserData = ({children}) => {
    
    const [userdata, dispatchUser] = useReducer(reducer, initialState);

    return(
        <UserContext.Provider value={{userdata, dispatchUser}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;