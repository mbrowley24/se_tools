import React, {useMemo} from "react";



function ProductTableRow({product, productIds, idToogle}){
    
    const checked = useMemo(()=>{
        if(productIds === undefined){
            return false;
        }
        
        return productIds.includes(product.id)
    } ,[productIds]);
    
        

    return(
        <tr>
            <td>
                <input type="checkbox" 
                    value={product.id}
                    checked={checked}
                    onChange={(e)=>idToogle(e.target.value)}
                    />
            </td>
            <td>{product.name}</td>
            <td>{product.description}</td>
        </tr>
    )
}

export default ProductTableRow;