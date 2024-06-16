import React, {useEffect} from "react";
import useHttp from "../../../hooks/useHttp";
import useTextTransform from "../../../hooks/useTextTransform";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../../store/company";

function VerticalSelection({label, name, value, onChange, errors}){
    const {httpRequest} = useHttp();
    const {capitialize} = useTextTransform();
    const dispatch = useDispatch();
    const verticalData = useSelector((state) => state.companyData.verticalData);
    

    useEffect(()=>{

        if(!verticalData) return; 
        
        if(verticalData.length > 0){
            return;
        }
        console.log('fetching verticals');
        const configRequest = {
            url: 'api/v1/verticals',
            method: 'GET',
        };

        function applyData(res){
            if(res.status === 200){
                dispatch(companyActions.loadVerticals(res.data));
            }
            
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();

    }, []);

    return(
        <>
            {label && <label>{label}</label>}
            <select name={name}
                value={value}
                onChange={(e)=>onChange(e)}
            >
                <option value="">Choose Vertical</option>
                {
                    verticalData.map((item) => {
                        return(
                            <option key={item.value} value={item.value}>{capitialize(item.name)}</option>
                        )
                    })
                }
            </select>
            {errors.vertical && <p className="errors">{errors.vertical}</p>}
        </>
    )
};


export default VerticalSelection;