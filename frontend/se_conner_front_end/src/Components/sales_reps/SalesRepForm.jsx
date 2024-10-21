import React from "react";






function SalesRepForm({submit, state, dispatch}) {

    function inputChange(e) {
        const { name, value } = e.target;

        dispatch({type:name, payload:value});
    }

    return (
        <form onSubmit={submit}>
            <div>
                <label htmlFor="">First Name</label>
                <input type="text"
                       name={"first_name"}
                       onChange={(e)=>inputChange(e)}
                       value={state.sales_rep.first_name}
                />
                <p className={'error'}>{state.errors['first_name']? state.errors['first_name'] : ""}</p>
            </div>
            <div>
                <label htmlFor="">Last Name</label>
                <input type="text"
                       name="last_name"
                       onChange={(e) =>inputChange(e)}
                       value={state.sales_rep.last_name}
                />
                <p className={'error'}>{state.errors['last_name']? state.errors['last_name'] : ""}</p>
            </div>
            <div>
                <label htmlFor="">Email Address</label>
                <input type="text"
                        name="email"
                        onChange={(e)=>inputChange(e)}
                        value={state.sales_rep.email}
                />
                <p className={'error'}>{state.errors['email']? state.errors['email'] : ''}</p>
            </div>
            <div>
                <label htmlFor="">Phone</label>
                <input type="text"
                       name="phone"

                       onChange={(e)=>inputChange(e)}
                       value={state.sales_rep.phone}
                />
                <p className={'error'}>{state.errors['phone']? state.errors['phone'] : ""}</p>
            </div>
            <div>
                <label htmlFor="">Roles</label>
                <select name="role"
                        onChange={(e)=>inputChange(e)}
                        value={state.sales_rep.role}
                >
                    <option value="">Select a Role</option>
                    {
                        state.roles.map((role)=>{
                            return(
                                <option key={role.value} value={role.value}>{role.name}</option>
                            )
                        })
                    }

                </select>
                <p className={'error'}>{state.errors['role']? state.errors['role'] : ''}</p>
            </div>
            <div>

                <label htmlFor="">Quota</label>
                <input type="string"
                       name="quota"
                       value={state.sales_rep.quota}
                       onChange={(e)=>inputChange(e)}
                />
                <p className={'error'}>{state.errors['quota']? state.errors['quota'] : ''}</p>
            </div>
            <div>
                <button
                    disabled={Object.keys(state.errors).length > 0}
                >Save</button>
            </div>
        </form>
    )
}

export default SalesRepForm;