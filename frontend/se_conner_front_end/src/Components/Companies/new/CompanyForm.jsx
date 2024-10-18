import React from 'react';



function CompanyForm({submit, state, dispatch }) {



    function inputChange(e) {
        const {name, value} = e.target;

        dispatch({type: name, payload: value});

    }


    return (
        <form onSubmit={submit}>
            <div>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text"
                            value={state.company.name}
                            name={"name"}
                           onChange={(e)=> inputChange(e)}/>
                </div>
            </div>
            <div>
                <label htmlFor="">Industry</label>
                <select
                       name={'industry'}
                       value={state.company.industry}
                       onChange={(e)=> inputChange(e)}
                >
                    <option value="">Select Industry</option>
                    {
                        state.industries.map((industry)=>{
                            return (
                                <option value={industry.value} key={industry.value}>
                                    {industry.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="">Sales Rep</label>
                <select name="sales_rep"
                    value={state.sales_rep}
                    onChange={(e)=> inputChange(e)}>
                >
                    <option value="">Select Sales Rep</option>
                    {
                        state.sales_reps.map((sales_rep)=>{

                            return(
                                <option value={sales_rep.value} key={sales_rep.value}>
                                    {sales_rep.name}
                                </option>
                            )

                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="">Notes</label>
                <textarea name="notes" id="" cols="30" rows="10"
                value={state.company.notes}
                onChange={(e)=> inputChange(e)}>
                </textarea>
                <p className={'count'}>{state.company.notes.length}</p>
            </div>
            <div>
                <button>Save</button>
            </div>
        </form>
    )
}

export default CompanyForm;