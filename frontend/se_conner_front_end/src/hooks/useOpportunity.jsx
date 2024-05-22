

function useOpportunity(){


    const FIELDS ={
        AMOUNT: "amount",
        CLOSE : "close",
        DESCRIPTION: "description",
        EMAIL: "email",
        FIRST_NAME: "first_name",
        LAST_NAME: "last_name",
        NAME : "name",
        PHONE: "phone",
        QUOTA: "quota",
        ROLE: "role",
        SALESREP: "sales_Rep",
        STATUS : "status",
    }

    const oppValidState = {
        name: false,
        amount: false,
        close_date: false,
        status: false,
        sales_rep: false,
        description: false,
    }

    function validOpportunityReducer(state, action){

        const data = JSON.parse(JSON.stringify(state));

        switch(action.type){

            case FIELDS.NAME:
                
                data.name = action.payload;
                return data;
            
            case FIELDS.AMOUNT:
                
                data.amount = action.payload;
                return data;

            case FIELDS.CLOSE:
                data.close_date = action.payload;
                return data;

            case FIELDS.STATUS:
                data.status = action.payload;
                return data;

            case FIELDS.SALESREP:
                data.sales_rep = action.payload;
                return data;
            
            case FIELDS.DESCRIPTION:
                data.description = action.payload;
                return data;

            default:
                return data;
                
        }
    }
    
    function validateOpp(opp){

        const data = JSON.parse(JSON.stringify(opp));

        if(data.name){
            if(data.amount){
                if(data.close_date){
                    if(data.status){
                        if(data.sales_rep){
                            if(data.description){
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    return({
        oppValidState,
        validateOpp,
        validOpportunityReducer,
    })
}

export default useOpportunity;