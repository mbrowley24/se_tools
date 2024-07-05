import React, {useEffect, useMemo, useReducer, useState} from "react";
import ContactNameCell from "./ContactNameCell";
import ContactEmailCell from "./ContactEmailCell";
import ContactPhone from "./ContactPhone";
import useContact from "../../../../hooks/useContact";
import ContactActions from "./ContactActions";
import useTextTransform from "../../../../hooks/useTextTransform";


function ContactTableRow({data, id}){
    const {capitialize} = useTextTransform();
    const [emailUnique, setEmailUnique] = useState(true);
    const {change, checkForErrors,contactReducer, contactState, phoneNumberFormat} = useContact();
    const [contact, dispatchContact] = useReducer(contactReducer, contactState);
    
    const errors = useMemo(()=>checkForErrors(contact), [contact]);

    const update = useMemo(()=>change(data, contact), [data, contact]);

    const reset = () => dispatchContact({type: 'update', payload: data});

    const checkEmail = (isUnique) =>{

        if(!data) return;
        if(contact.email.length === 0) return;

        if(data.email === contact.email){
            setEmailUnique(true);
            return;
        }
        setEmailUnique(isUnique);
    }; 

    function inputChange(e){
        const {name, value} = e.target;
        
        dispatchContact({type: name, payload: value});
    }

    useEffect(() => {
        dispatchContact({type: 'update', payload: data});
    }, [data]);

    
    return(
        <tr>
            <ContactNameCell name={'title'} data={capitialize(contact.title)} inputChange={inputChange}/>
            <ContactNameCell name={'first_name'} data={capitialize(contact.first_name)} inputChange={inputChange}/>
            <ContactNameCell name={'last_name'} data={capitialize(contact.last_name)} inputChange={inputChange}/>
            <ContactEmailCell name={'email'} 
                                data={contact.email} 
                                inputChange={inputChange}
                                isUnique={checkEmail}
                                />
            <ContactPhone name={'phone'} data={phoneNumberFormat(contact.phone)} inputChange={inputChange}/>
            <ContactActions data={contact}
                            email_unique={emailUnique} 
                            errors={errors} 
                            reset={reset}
                            id={id}
                            update={update}
                            />
        </tr>
    )
}

export default ContactTableRow;