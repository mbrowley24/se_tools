import React from 'react';


function CompanyForm({submit, state, dispatch }) {

    console.log(state);


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
                >
                    {
                        state.industries.map((industry)=>{
                            return (
                                <option value={industry.name} key={industry.value}>
                                    {industry.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="">Notes</label>
                <textarea name="notes" id="" cols="30" rows="10"></textarea>
            </div>
            <div>
                <button>save</button>
            </div>
        </form>
    )
}

export default CompanyForm;