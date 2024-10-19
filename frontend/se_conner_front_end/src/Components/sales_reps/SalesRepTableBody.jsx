import React from 'react';
import SalesRep from './SalesReps';



function SalesRepTableBody({sales_reps}) {


    return (
        <tbody>
        {
            sales_reps.map(sales_rep => {
                return(
                    <SalesRep key={sales_rep.id} sales_rep={sales_rep}/>
                )
            })
        }
        </tbody>
    )
}

export default SalesRepTableBody;