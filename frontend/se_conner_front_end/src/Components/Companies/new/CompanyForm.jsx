import React, {useMemo} from 'react';



function CompanyForm({submit, state, dispatch }) {

    const valid = useMemo(()=> Object.keys(state.errors).length === 0, [state]);


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
                {state.errors["name"]? <p className={'error'}>{state.errors['name']}</p> : null}
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
                {state.errors["industry"]? <p className={'error'}>{state.errors['industry']}</p> : null}
            </div>
            <div>
                <label htmlFor="">Sales Rep</label>
                <select name="sales_rep"
                    value={state.sales_rep}
                    onChange={(e)=> inputChange(e)}
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
                {state.errors["sales_rep"]? <p className={'error'}>{state.errors['sales_rep']}</p> : null}
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
                <button
                    disabled={Object.keys(state.errors).length > 0}
                >Save</button>
            </div>
        </form>
    )
}

export default CompanyForm;