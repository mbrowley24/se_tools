import React from "react";
import ProductTableRow from "./ProductTableRow";



function ProductTableBody({data, idToogle}){

    return(
        <tbody>
            {
                data.products.map((product)=>{
                    return(
                        <ProductTableRow key={product.id}
                            product={product}
                            productIds={data.productIds}
                            idToogle={idToogle}
                            />
                    )
                })
            }
        </tbody>
        
    )
}

export default ProductTableBody;