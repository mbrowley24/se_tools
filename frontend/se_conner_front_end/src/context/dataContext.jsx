import { createContext, useState } from "react";


const DataContext = createContext();

export const AppDataContext = ({children}) => {
    const [oppstatus, setOppStatus] = useState([]);

    return(
        <DataContext.Provider value={{oppstatus, setOppStatus}}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;