import {useEffect, useState} from 'react'



function Appointment({appointment}) {
    const [apt, setApt] = useState({
        id : '',
        type : '',
        company: '',
        sales_rep: '',
        date : '',
        sales_engineer: '',
        product : 0,
        products : [],
        updated_at : '',
    });


    useEffect(()=>{
        setApt(appointment)

        return ()=> {}

    }, [])



    return (
        <>
            <tr>
                <td>{apt.date}</td>
                <td>{`${apt.type} - ${apt.company}`}</td>
                <td>{apt.sales_rep}</td>
                <td>{apt.sales_engineer}</td>
                <td>{apt.product}</td>
                <td>{apt.updated_at}</td>
            </tr>
        </>
    )
}

export default Appointment;