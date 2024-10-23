import useGeneral from "./useGeneral.jsx";





function useAppointment() {
    const {dateValidation} = useGeneral();
    const initialAppointmentState = {
        company: {
            name: '',
            id : '',
        },
        page:{
            appointment:{
                id : '',
                in_person: false,
                time: '',
                date:'',
                type: '',
                description: '',
                notes : '',
                products: []
            },
            num: 0,
            limit: 10
        },
        appointments:[],
        types:[],
        products: [],
        errors: {}
    }

    function appointmentReducer(state, action){

        let data = JSON.parse(JSON.stringify(state));

        switch(action.type){

            case 'in_person':

                data.page.appointment.in_person = !data.page.appointment.in_person;
                return data;

            case 'time':

                console.log(action.payload);

                return data;

            case 'date':

                console.log(action.payload);

                return data;

            case 'notes':

                console.log(action.payload);
                return data;

            case 'type':

                const type_filter = data.types.filter((type) => type.id === action.payload );

                if(type_filter.length === 1){

                    data.page.appointment.type = action.payload;
                }
                return data;

            case 'products':

                const includes_product = data.page.appointment.products.includes((product) => product.id === action.payload);

                if(includes_product){

                    const new_products = data.page.appointment.products.filter((product) => product !== action.payload);

                    data.page.appointment.products = [...new_products];

                }else{

                    data.page.appointment.products.push(action.payload);

                }

                return data;

            case 'description':

                data.page.appointment.description = action.payload;

                return data;

            case 'form_data':

                console.log(action.payload);

                data.types = [...action.payload.formData.types];
                data.products = [...action.payload.formData.products];

                return data;


            default:
                return data;
        }
    }

    return({
        appointmentReducer,
        initialAppointmentState
    })
}

export default useAppointment;