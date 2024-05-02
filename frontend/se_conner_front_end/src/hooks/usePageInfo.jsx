


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
                
                const page_info = action.payload.pageInfo;
                const page_data = action.payload.data;
                
                
                data.total_pages = page_info.totalPages;
                data.total_items = page_info.totalItems
                data.page = page_info.page;
                data.limit = page_info.limit;
                data.hasNext = page_info.hasNext;
                data.hasPrev = page_info.hasPrev;
                data.isFirst = page_info.isFirst;
                data.isLast = page_info.isLast;
                data.data = page_data? [...page_data] : [];
                
                return data;

            case PAGE_FIELDS.FIRST_PAGE:
                data.page = 0;
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