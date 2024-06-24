import React, {useLayoutEffect, useState} from "react";




function Pagination({data}){
    const [pageData, setPageData] = useState({
        page: 0,
        size: 0,
        totalPages: 0,
    });

    useLayoutEffect(() => {
 
        setPageData({
            page: data.number + 1,
            size: data.size,
            totalPages: data.totalPages === 0 ? 1 : data.totalPages,
        })
    }, [data])
    
    
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
                <p className="">{`${pageData.page} of ${pageData.totalPages}`}</p>
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