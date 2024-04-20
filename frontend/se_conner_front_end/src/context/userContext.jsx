import { createContext, useState } from "react";


const UserContext = createContext();

export const UserData = ({children}) => {
    const [login, setLogin] = useState({
        username: "",
        password: "",
    });

    const [register, setRegister] = useState({
        username: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    return(
        <UserContext.Provider value={{login, setLogin, register, setRegister}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;