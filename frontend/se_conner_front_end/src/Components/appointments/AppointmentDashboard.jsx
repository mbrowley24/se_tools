import {useState, useEffect} from 'react'




function AppointmentDashboard() {
    const[aptData, setAptData] = useState({
        name: [],
        page: 0,
        limit: 10,
    })

    useEffect(()=>{



        return () =>{}

    },[aptData.page, aptData.size])

    return (
        <></>
    )
}

export default AppointmentDashboard;