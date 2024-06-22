import React from "react";




function Pagination({data}){
    
    
    return(
        <div className="pagination">
            <div className="">
                <button 
                    disabled={data.first}
                >
                    <span className="material-symbols-outlined">
                        chevron_left
                    </span>
                </button>
                <p className="">{`${data.number + 1} of ${data.totalPages}`}</p>
                <button
                    disabled={data.last}
                >
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    )
    
}

export default Pagination;