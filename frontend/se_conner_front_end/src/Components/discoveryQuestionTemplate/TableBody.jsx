import React from "react";
import {Link} from "react-router-dom";
import useHttp from "../../hooks/useHttp";

function TableBody({data}){
    const {httpRequest} = useHttp();

    function downloadTemplate(id){

        const configRequest = {
            method: "GET",
            url: `api/v1/questions/templates/${id}/addPDF`,
            responseType: "blob",
            headers: {
                "Content-Type": "application/json",
            }
        };

        function applyData(res){
            console.log(res);
            if(res.status === 200){
                const blob = new Blob([res.data], {type: "application/pdf"});
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute("download", "template.pdf");
                link.download = "template.pdf";
                link.click();

                window.URL.revokeObjectURL(link.href);
                console.log("Downloaded");
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();
    }


    return(
        <tbody>
            {data && data.length > 0 && data.map((row, index) => (
                
                <tr key={index}
                    className="table-row"
                >
                    <td>{row.name.charAt(0).toUpperCase() + row.name.slice(1)}</td>
                    <td>{row.author}</td>
                    <td>{row.questions}</td>
                    <td>{new Date(row.updated).toLocaleDateString()}</td>
                    <td>
                        <Link to={`/discoveryquestions/templates/${row.id}`}>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </Link>
                        <Link to={''}>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </Link>
                        <button className="download_template"
                            onClick={() => downloadTemplate(row.id)}
                        >
                            <span className="material-symbols-outlined">
                                download
                            </span>
                        </button>
                        
                    </td>
                </tr>
            ))}
            {
                data && data.length === 0 && (
                    <tr className="table-row">
                        <td colSpan="5">No data found</td>
                    </tr>
                )
            }
        </tbody>
    )
}

export default TableBody;