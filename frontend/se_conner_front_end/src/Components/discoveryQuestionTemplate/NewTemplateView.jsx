import React, {useEffect, useReducer} from "react";
import usePageInfo from "../../hooks/usePageInfo";
import useHttp from "../../hooks/useHttp";  
import Header from "../header/Header";
import Questions from "../questions/panels/Questions";

function NewTemplateView({}){
    const {httpRequest} = useHttp();
    const {pageReducer, pageInfo, PAGE_FIELDS} = usePageInfo();
    const [page, dispatch] = useReducer(pageReducer, pageInfo);

    useEffect(() => {
            
            const controller = new AbortController();
    
            const configRequest={
                method: 'GET',
                url: 'api/v1/questions',
                signal: controller.signal
            }
    
            function applyData(res){
                console.log(res)
                if (res.status === 200) {
                    if(res.data.data.data){
                        dispatch({type: PAGE_FIELDS.LOAD_PAGE, payload: res.data.data})
                    }
                    
                }
                
            }
    
            (async () => {
                httpRequest(configRequest, applyData)
            })();

    }, []);

    return(
        <>
            <Header/>
            <div>
               
            </div>
            <Questions page={page}
                        dispatch={dispatch}
                        fields={PAGE_FIELDS}
            />
        </>
    )
}


export default NewTemplateView;