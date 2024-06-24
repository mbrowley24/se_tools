import React, {useReducer} from "react";
import { useParams } from "react-router-dom";
import Header from "../../../header/Header";
import { companyActions } from "../../../../store/company";
import { useDispatch } from "react-redux";
import useContact from "../../../../hooks/useContact";
import useHttp from "../../../../hooks/useHttp";
import "../../../../css/form/form.css";
import ContactForm from "./ContactForm";


function ContactFormView({}){
    const {id} = useParams();
    const {contactReducer, contactState} = useContact();
    const {httpRequest} = useHttp();
    const dispatch = useDispatch();
    const [contactData, dispatchContact] = useReducer(contactReducer, contactState);


    function inputChange(e){
        const {name, value} = e.target;

        dispatchContact({type: name, payload: value});
    }

    function submit(e){
        e.preventDefault();
        
        const configRequest = {
            method: 'POST',
            url: `api/v1/contacts/${id}`,
            data: contactData
        }

        function applyData(res){
            console.log(res);
            if(res.status === 200){
                dispatchContact({type: 'reset', payload: ''});
                dispatch(companyActions.updateContacts(res.data))
            }
            
        }

        (async()=>{
            await httpRequest(configRequest, applyData);
        })()


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