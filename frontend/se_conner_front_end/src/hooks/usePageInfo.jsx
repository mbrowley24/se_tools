


function usePageInfo() {

    const PAGE_FIELDS = {
        FIRST_PAGE : 'first_page',
        PAGE_BACK : 'page_back',
        PAGE_UP : 'page_up',
        LAST_PAGE : 'last_page',
        LOAD_PAGE : 'load_page',
        PAGE_SIZE_UP : 'page_size_up',
        PAGE_SIZE_DOWN : 'page_size_down',
        TOTAL_PAGES : 'total_pages',
        TOTAL_ITEMS : 'total_items'

    }

    const pageInfo ={
        page : 0,
        limit : 10,
        total_pages : 0,
        total_items : 0,
        hasNext: false,
        hasPrev: false,
        isFirst: false,
        isLast: false,
        data: []

    }

    function pageReducer(state, action) {

        const data = JSON.parse(JSON.stringify(state));

        switch(action.type){
            
            case PAGE_FIELDS.PAGE_UP:
                const newPage = data.page + 1;

                if(newPage < data.total_pages){
                    
                    data.page + 1;
                }

                return data;

            case PAGE_FIELDS.PAGE_BACK:
                const page_down = data.page - 1;

                if(page_down >= 0){
                    
                    data.page - 1;
                }

                return data;

            case PAGE_FIELDS.PAGE_SIZE_UP:
                const new_page_size_up = action.payload;    

                if(new_page_size_up <= 50){
                    
                    data.page_size = new_page_size_up;
                }
                
                return data;
            
            case PAGE_FIELDS.PAGE_SIZE_DOWN:
                
                const new_page_size_down = action.payload;

                if(new_page_size_down >= 10){
                    
                    data.page_size = new_page_size_down;
                }

                return data;
            
            case PAGE_FIELDS.TOTAL_PAGES:
                const total_pages = action.payload;

                data.total_pages = total_pages;

                return data;

            case PAGE_FIELDS.TOTAL_ITEMS:
                const total_items = action.payload;

                data.total_items = total_items;

                return data;
            
            case PAGE_FIELDS.LOAD_PAGE:
                
                console.log(action.payload) 
                // const page_info = action.payload.pageInfo;
                const page_data = action.payload;
                    
                data.total_pages = page_data.totalPages === 0 ? 1 : page_data.totalPages;
                data.total_items = page_data.totalElements;
                data.page = page_data.number;
                data.limit = page_data.size;
                data.isFirst = page_data.first;
                data.isLast = page_data.last;
                data.data = page_data? [...page_data.content] : [];
                
                return data;

            case PAGE_FIELDS.FIRST_PAGE:
                data.page = 0;
                return data;
            
            case "delete":
                
                const id = action.payload;
                const newData = data.data.filter(item => item.id !== id);
                
                data.data = [...newData];
                
                return data;

            default:
                return data;
        }
    }

    return({
        pageInfo,
        pageReducer,
        PAGE_FIELDS
    });
}

export default usePageInfo;