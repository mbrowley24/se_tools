import React from "react";



function TableBody({data}){
    return(
        <tbody>
            {data && data.length > 0 && data.map((row, index) => (
                <tr key={index}
                    className="table-row"
                >
                    <td>{row.name}</td>
                    <td>{row.author}</td>
                    <td>{row.questions}</td>
                    <td>{new Date(row.updated_at).toLocaleDateString()}</td>
                    <td>
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                        <span class="material-symbols-outlined">
                            download
                        </span>
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