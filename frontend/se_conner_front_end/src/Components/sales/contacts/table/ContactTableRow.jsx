import React, {useReducer} from "react";
import ContactNameCell from "./ContactNameCell";
import ContactEmailCell from "./ContactEmailCell";
import ContactPhone from "./ContactPhone";
import useContact from "../../../../hooks/useContact";



function ContactTableRow({data}){
    const {contactReducer, contactState} = useContact();
    const [contact, dispatchContact] = useReducer(contactReducer, contactState);
    
    function inputChange(e){
        const {name, value} = e.target;
        
        dispatchContact({type: name, payload: value});
    }

    return(
        <tr>
            <ContactNameCell name={'title'} data={contact.title} inputChange={inputChange}/>
            <ContactNameCell name={'first_name'} data={contact.first_name} inputChange={inputChange}/>
            <ContactNameCell name={'last_name'} data={contact.last_name} inputChange={inputChange}/>
            <ContactEmailCell name={'email'} data={contact.email} inputChange={inputChange}/>
            <ContactPhone name={'phone'} data={contact.phone} inputChange={inputChange}/>
        </tr>
    )
}

export default ContactTableRow;