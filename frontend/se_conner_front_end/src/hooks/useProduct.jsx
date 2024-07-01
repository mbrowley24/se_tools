



function useProduct(){

    const productInitial = {
        products : [],
        productIds : [],
        productIdsCheck: []
    };

    function productReducer(state, action){
        
        const data = JSON.parse(JSON.stringify(state));

        switch(action.type){

            case "update":

                data.products = [...action.payload.products];
                data.productIds = [...action.payload.productIds];
                data.productIdsCheck = [...action.payload.productIds];

                return data;

            case "checkUnchecked":
                
                const product_id_list= [...data.productIds];

                const include = product_id_list.includes(action.payload);
                
                if(include){

                    //filter out the id from the list
                    const filtered_list = product_id_list.filter((id)=> id !== action.payload);

                    data.productIds = [...filtered_list];
                
                }else{

                    data.productIds.push(action.payload);
                    
                }

                return data;
                
            default:
                return state;
        }
    }

    function checkId(data){

        const orignal_list = [...data.productIdsCheck];
        const edited_list = [...data.productIds];
        
        const orignal_length = orignal_list.length;
        const edited_length = edited_list.length;

        if(edited_length === 0){
            
            return false;
        }

        if(orignal_length !== edited_length){
            
            return true;
        }

        if(orignal_length === edited_length){
            
            const difference = orignal_list.filter((id)=> !edited_list.includes(id));
            
            if(difference.length > 0){
                
                return true;
            }
        }

        return false;
        
    }

    return({
        checkId,
        productInitial,
        productReducer
    })
}

export default useProduct;