import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import Header from "../header/Header.jsx";
import AppointmentTableHead from "./AppointmentTableHead.jsx";
import useHttp from "../../hooks/useHttp.jsx";
import AppointmentTableBody from "./AppointmentTableBody.jsx";
import "../../css/table/table.css"


function AppointmentDashboard() {
    const {id} = useParams();
    const {httpRequest} = useHttp();
    const[aptData, setAptData] = useState({
        name: [],
        page: 0,
        limit: 10,
    })

    useEffect(()=>{


        const requestConfig = {
            method: "GET",
            url : `appointments?page=${aptData.page}&limit=${aptData.limit}`,
        }

        function applyData(res){
            console.log(res)
        }

        (async()=>{
            await httpRequest(requestConfig, applyData);
        })()



        return () =>{}

    },[aptData.page, aptData.size])

    return (

        <div>
            <Header/>
            <div className={'container'}>
                <h1>Appointments</h1>
                <div className={'links'}>
                    <Link to={`/companies/${id}/appointments/new`}>New Appointment</Link>
                </div>
                <table>
                    <AppointmentTableHead/>
                    <AppointmentTableBody/>
                </table>
            </div>
        </div>

    )
}

export default AppointmentDashboard;