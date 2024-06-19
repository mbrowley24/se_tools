import React, {useReducer} from "react";
import { useParams } from "react-router-dom";
import Header from "../../../header/Header";
import useContact from "../../../../hooks/useContact";
import useHttp from "../../../../hooks/useHttp";
import "../../../../css/form/form.css";
import ContactForm from "./ContactForm";


function ContactFormView({}){
    const {id} = useParams();
    const {contactReducer, contactState} = useContact();
    const {httpRequest} = useHttp();
    const [contactData, dispatchContact] = useReducer(contactReducer, contactState);


    function inputChange(e){
        const {name, value} = e.target;
        console.log(name, value);

        dispatchContact({type: name, payload: value});
    }

    function submit(e){
        e.preventDefault();
        
    }

    return(
        <div className="">
            <Header/>
            <div className="form_container_body">
                <h1>Create New Contact</h1>
                <ContactForm data={contactData} submit={submit} inputChange={inputChange} id={id}/>
            </div>
        </div>
    )
}


export default ContactFormView;