import React from 'react';
import "../../css/pagination/pagination.css";

function Pagination({data, dispatch, names}){
    
    function pagination(name){
        dispatch({type: names, payload: null})
    }
	console.log(JSON.parse(JSON.stringify(data)))
	return(
		<div className='page_pannel'>
			<div>
				<div className='arrow'>
					<button onClick={()=>pagination("first_page")}
						disabled={data.first}
					>
						<span className="material-symbols-outlined">
							keyboard_double_arrow_left
						</span>
					</button>
				</div>
				<div className='arrow'>
					<button
						disabled={data.first}
						onClick={()=>pagination("page_back")}
						>
						<span className="material-symbols-outlined">
							keyboard_arrow_left
						</span>
					</button>
				</div>
				<div className='page-drop-down'>
					<p>{data.number + 1} of {data.totalPages}</p>
				</div>
				<div className='arrow'>
					<button
						disabled={data.last}
						onClick={()=>pagination("page_up")}
					>
						<span className="material-symbols-outlined">
							keyboard_arrow_right
						</span>
					</button>
				</div>
				<div className='arrow'>
					<button
						disabled={data.last}
						onClick={()=>pagination("last_page")}
					>
						<span className="material-symbols-outlined">
							keyboard_double_arrow_right
						</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Pagination;