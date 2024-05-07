import React from "react";
import {Link} from "react-router-dom";


function TableBody({data}){
    return(
        <tbody>
            {data && data.length > 0 && data.map((row, index) => (
                
                <tr key={index}
                    className="table-row"
                >
                    <td>{row.name.charAt(0).toUpperCase() + row.name.slice(1)}</td>
                    <td>{row.author}</td>
                    <td>{row.questions}</td>
                    <td>{new Date(row.updated_at).toLocaleDateString()}</td>
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
                        <Link to={''}>
                            <span className="material-symbols-outlined">
                                download
                            </span>
                        </Link>
                        
                    </td>
                </tr>
            ))}
            {
                data && data.length === 0 && (
                    <tr className="table-row">
                        <td colSpan="4">No data found</td>
                    </tr>
                )
            }
        </tbody>
    )
}

export default TableBody;