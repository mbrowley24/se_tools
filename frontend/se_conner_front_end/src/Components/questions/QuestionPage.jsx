import React from 'react';
import "../../css/pagination/pagination.css";





function QuestionPagination({pageInfo, dispatch, names}){

	function pagination(name){
		dispatch({type: names, payload: null})
		console.log(name)
	}

	console.log(pageInfo)
	return(
		<div className='page_pannel'>
			<div>
				<div className='arrow'>
					<button onClick={()=>pagination(names.FIRST_PAGE)}
						disabled={pageInfo.isFirst}
						name={names.FRIST_PAGE}
					>
						<span className="material-symbols-outlined">
							keyboard_double_arrow_left
						</span>
					</button>
				</div>
				<div className='arrow'>
					<button
						name={names.PAGE_BACK}
						disabled={!pageInfo.hasPrev}
						onClick={()=>pagination(names.PAGE_DOWN)}
						>
						<span className="material-symbols-outlined">
							keyboard_arrow_left
						</span>
					</button>
				</div>
				<div className='page-drop-down'>
					<p>{pageInfo.page + 1} of {pageInfo.total_pages}</p>
				</div>
				<div className='arrow'>
					<button
						name={names.PAGE_UP}
						disabled={!pageInfo.hasNext}
						onClick={()=>pagination(names.PAGE_UP)}
					>
						<span className="material-symbols-outlined">
							keyboard_arrow_right
						</span>
					</button>
				</div>
				<div className='arrow'>
					<button
						name={names.LAST_PAGE}
						disabled={pageInfo.isLast}
						onClick={()=>pagination(names.LAST_PAGE)}
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

export default QuestionPagination;