import React, {useEffect, useReducer} from "react";
import Header from "../../header/Header.jsx";
import useAppointment from "../../../hooks/useAppointment.js";
import AppointmentForm from "../form/AppointmentForm.jsx";
import useHttp from "../../../hooks/useHttp.jsx";
import '../../../css/form/new_appointment_form.css'


function NewAppointment({}) {
    const {appointmentReducer, initialAppointmentState} = useAppointment();
    const [state, dispatch] = useReducer(appointmentReducer, initialAppointmentState);
    const {httpRequest} = useHttp();

    useEffect(() => {

        const configRequest = {
            url: `appointments/new`,
            method: "GET",
        }

        function applyData(res){
            console.log(res)
            dispatch({type: "form_data", payload: res.data})
        }

        httpRequest(configRequest, applyData);

    },[])


    function submit(e){
        e.preventDefault()

        const configRequest = {
            url: `appointments/new`,
            method: "POST",
        }

        function applyData(res){
            console.log(res)
        }

        httpRequest(configRequest, applyData);
    }


    return (
        <div>
            <Header/>
            <div className={'application_form'}>
                <h1>New Appointment</h1>
                <AppointmentForm submit={submit} state={state} dispatch={dispatch}/>
            </div>
        </div>
    )
}

export default NewAppointment;