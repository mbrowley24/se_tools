import React, {useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import ContactFirstName from './ContactFirstName';
import ContactLastName from './ContactLastName';
import ContactTitle from './ContactTitle';
import ContactEmail from './ContactEmail';
import ContactPhone from './ContactPhone';
import useContact from '../../../../hooks/useContact';

function ContactForm({data, inputChange, submit, id}){
    const {checkForErrors} = useContact();
    const errors = useMemo(()=>checkForErrors(data), [data]);
    const navigate = useNavigate();

    return(
        <form>
            <ContactTitle value={data.title}
                        inputChange={inputChange}
                        errors={errors}
            />
            <ContactFirstName value={data.first_name}
                                inputChange={inputChange}
                                label={'First Name'}
                                errors={errors}
            />
            <ContactLastName value={data.last_name}
                            inputChange={inputChange}
                            label={"Last Name"}
                            errors={errors}
                            />
            <ContactEmail
                    value={data.email}
                    inputChange={inputChange}
                    errors={errors}
            />
            <ContactPhone
                    value={data.phone}
                    inputChange={inputChange}
                    errors={errors}
            />
            <div>
                <button onClick={(e)=>submit(e)}
                    disabled={Object.keys(errors).length > 0}
                    type="submit">Submit</button>
                <button onClick={()=>navigate(`/sales/companies/${id}`)} >Cancel</button>
            </div>
        </form>
    )
}


export default ContactForm;