import React from "react";



function TableBody({data}){
    return(
        <tbody>
            {data && data.length > 0 && data.map((row, index) => (
                <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.author}</td>
                    <td>{row.numQuestions}</td>
                </tr>
            ))}
            {
                data && data.length === 0 && (
                    <tr>
                        <td colSpan="3">No data found</td>
                    </tr>
                )
            }
        </tbody>
    )
}

export default TableBody;