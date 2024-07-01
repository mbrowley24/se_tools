import React from "react";
import ProductTableHead from "./ProductTableHead";
import ProductTableBody from "./ProductTableBody";



function ProductTable({data, idToogle}){

    return(
        <table>
            <ProductTableHead/>
            <ProductTableBody data={data} idToogle={idToogle}/>
        </table>
    )
}

export default ProductTable;