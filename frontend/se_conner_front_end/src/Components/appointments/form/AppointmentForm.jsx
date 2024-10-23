import React from 'react';




function AppointmentForm({dispatch, state, submit}) {

    function inputChange(e){
        const {value, name} = e.target;

        dispatch({type: name, payload: value});
    }

    return(
        <form onSubmit={submit}>
            <div className={'app_form_div'}>
                <label htmlFor="">Description</label>
                <input type="text"
                       name={'description'}
                       value={state.page.appointment.description}
                       onChange={(e) => inputChange(e)}
                />
            </div>
            <div className={'app_form_div_flex'}>
                <div>
                    <label htmlFor="">Date</label>
                    <input type="date"
                           name={'date'}
                           value={state.page.appointment.date}
                           onChange={(e) => inputChange(e)}/>
                </div>
                <div>
                    <label htmlFor="">Time</label>
                    <input type="time"
                           value={state.page.appointment.time}
                           name={"time"}
                           onChange={(e) => inputChange(e)}/>
                </div>
            </div>
            <div className={'app_form_check_bx'}>
                <label htmlFor="">In-Person</label>
                <input type="checkbox"
                       value={state.page.appointment.in_person}
                       name={'inPerson'}
                       onChange={(e) => inputChange(e)}/>
            </div>
            <div className={'app_form_div'}>
                <label htmlFor="">Type</label>
                <select name={'type'}
                        value={state.page.appointment.type}
                        onChange={(e) => inputChange(e)}
                >
                    <option value="">Choose Type</option>
                    {
                        state.types.map((type) => {
                            return (
                                <option key={type.value} value={type.value}>{type.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className={'app_form_div_products'}>
                <label htmlFor="">Products</label>
                <select
                    name={'products'}
                    className={''}
                    multiple={true}
                    value={state.page.appointment.products}
                    onChange={(e) => inputChange(e)}
                >
                    <option value="">Choose Products</option>
                    {
                        state.products.map((product) => {
                            return (
                                <option value={product.value} key={product.value}>{product.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className={'app_form_div'}>
                <label htmlFor="">Notes</label>
                <textarea name={'notes'}
                          value={state.page.appointment.notes}
                          cols="30"
                          rows="10"
                          onChange={(e) => inputChange(e)}
                ></textarea>
            </div>
            <div className={'app_save'}>
                <button>Save</button>
            </div>
        </form>
    )

}

export default AppointmentForm;