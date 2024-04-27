import React, {useEffect} from "react";
import Header from "../header/Header";
import TemplateTable from "./TemplateTable";
import usePageInfo from "../../hooks/usePageInfo";
import "../../css/question_template/template.css"



function TemplateView({}){
    const {pageReducer, pageInfo} = usePageInfo();
    
    useEffect(() => {
        
    }, []);

    return(
        <>
            <Header/>
            <div className="template">
                <TemplateTable/>
            </div>
        </>
    )
}


export default TemplateView;