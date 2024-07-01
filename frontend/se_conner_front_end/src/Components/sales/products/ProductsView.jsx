import React, { useLayoutEffect, useMemo ,useReducer } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../../header/Header";
import ProductTable from "./ProductsTable";
import useProduct from "../../../hooks/useProduct";
import useHttp from "../../../hooks/useHttp";
import "../../../css/table/table_form.css";


function ProductsView(){

    const {httpRequest} = useHttp();
    const {id} = useParams();
    const navigate = useNavigate();
    const {checkId, productInitial, productReducer} = useProduct();
    const [productData, dispatchProducts] = useReducer(productReducer, productInitial);
    const saved = useMemo(()=>checkId(productData), [productData]);

    
    const back = () => navigate(-1);
    
    useLayoutEffect(()=>{

        const configRequest={
            url:`api/v1/opportunities/${id}/products`,
            method:"GET"
        }
        
        function applyData(res){
            
            if(res.status === 200){
                dispatchProducts({type:"update", payload:res.data});
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData);
        })()

    },[])

    function idToogle(id){
        dispatchProducts({type:"checkUnchecked", payload: id});
    }

    function submit(e){
        e.preventDefault();

        const configRequest={
            url:`api/v1/opportunities/${id}/products`,
            method:"POST",
            data: productData.productIds
        }

        function applyData(res){
            console.log(res);
            if(res.status === 200){

                back();
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData);
        })()
    }

    return(
        <div>
            <Header/>
            <div className="container">
                <h1>Products</h1>
                <div className="submit_container">
                    <button className="back"
                            onClick={back}
                            >
                            Back
                    </button>
                    <button className=""
                            disabled={!saved}
                            onClick={submit}
                            >
                            Submit
                    </button>
                </div>
                <ProductTable data={productData} 
                    idToogle={idToogle}
                    />
            </div>
        </div>
    )
}


export default ProductsView;
