import detectAndShowError from "../../../utils/DetectExceptionAndShow";
import {Notification} from "../../../utils/Notification";

export default function defaultActions(types, setStateHandler, API) {

    this.setPaginationLimit = (limit) => ({type: types.SET_PAGINATION_LIMIT, payload: limit});
    this.setPaginationPage = (page) => ({type: types.SET_PAGINATION_PAGE, payload: page});
    this.setPaginationItems = (items) => ({type: types.SET_PAGINATION_ITEMS, payload: items});
    this.clearPaginationItems = () => this.setPaginationItems(null);
    this.setSearch = (search) => ({type: types.SET_SEARCH, payload: search});
    this.setCurrentItem = (item) => ({type: types.SET_CURRENT_ITEM, payload: item});
    this.clearCurrentItem = () => ({type: types.SET_CURRENT_ITEM, payload: null});
    this.startFetching = () => ({type: types.START_FETCHING});
    this.stopFetching = () => ({type: types.STOP_FETCHING});
    this.setSortableField = (field) => {
        return (dispatch, getState) => {
            const state = setStateHandler(getState());
            const {helper} = state;
            const {sort} = helper;
            if(field === sort.replace('-', '')){
                field = (sort.substr(0,1) !== '-') ? ('-' + field) : '';
            }
            dispatch({type: types.SET_SORTABLE_FIELD, payload: field});
        };
    };
    this.fetchItems = () => {
        return async (dispatch, getState) => {
            let data = [];
            let pages = 1;
            let items = 0;

            const state = setStateHandler(getState());
            const {pagination, helper} = state;
            const {page, limit} = pagination;
            const {sort, search} = helper;

            let currentLimit = limit.current === 'all' ? 999999 : limit.current;

            try{
                const response = await API.index(page.current, currentLimit, search, sort);
                if(
                    response && response.data && response.data.data &&
                    response.data.meta && response.data.meta.last_page &&
                    response.data.meta.total
                ){
                    data = response.data.data;
                    pages = response.data.meta.last_page;
                    items = response.data.meta.total;
                }

            }catch (e){
                dispatch(detectAndShowError(e));
            }

            dispatch({
                type: types.FETCH_ITEMS,
                payload: {
                    data: data,
                    pagination: {
                        pages: {
                            all: pages,
                            current: page.current > pages ? pages : page.current
                        },
                        items: items
                    }
                }
            });
        };
    };
    this.fetchItemByIdAndSetCurrent = (id) => {
        return async (dispatch) => {
            dispatch(this.startFetching());
            let item = null;
            try{
                const response = await API.show(id);
                if(
                    response && response.data && response.data.data &&
                    Object.prototype.toString.call(response.data.data) === '[object Object]'
                ){
                    item = response.data.data;
                }
            }catch (e){
                dispatch(detectAndShowError(e));
            }
            dispatch(this.setCurrentItem(item))
            dispatch(this.stopFetching());
        };
    };
    this.createItemAndSetCurrent = (item, message= true) => {
        return async (dispatch) => {
            dispatch(this.startFetching());
            try{
                const response = await API.create(item);
                if(
                    response && response.data && response.data.data &&
                    Object.prototype.toString.call(response.data.data) === '[object Object]'
                ){
                    message && Notification.success('Создано','Запись успешно создана');
                    dispatch(this.setCurrentItem(response.data.data));
                }
            }catch (e){
                dispatch(detectAndShowError(e));
            }
            dispatch(this.stopFetching());
        };
    };
    this.updateItemAndSetCurrent = (item) => {
        return async (dispatch) => {
            dispatch(this.startFetching());
            try{
                const response = await API.update(item);
                if(
                    response && response.data && response.data.data &&
                    Object.prototype.toString.call(response.data.data) === '[object Object]'
                ){
                    Notification.success('Сохранено','Запись успешно изменена');
                    dispatch(this.setCurrentItem(response.data.data));
                }
            }catch (e){
                dispatch(detectAndShowError(e));
            }
            dispatch(this.stopFetching());
        };
    };
    this.deleteItem = (item) => {
        return async (dispatch) => {
            try{
                dispatch(this.startFetching());
                const response = await API.delete(item.id);
                dispatch(this.stopFetching());
                if(response.status === 200){
                    Notification.success('Удалено','Запись успешно удалена');
                    dispatch(this.fetchItemsByCurrentPagination());
                }
            }catch (e){
                dispatch(detectAndShowError(e));
            }
        };
    };
    this.changeSearchAndFetchItems = (value) => {
        return async (dispatch) => {
            dispatch(this.startFetching());
            dispatch(this.setSearch(value));
            await dispatch(this.fetchItems());
            dispatch(this.stopFetching());
        };
    };
    this.changeSortableAndFetchItems = (value) => {
        return async (dispatch) => {
            dispatch(this.startFetching());
            dispatch(this.setSortableField(value));
            await dispatch(this.fetchItems());
            dispatch(this.stopFetching());
        };
    };
    this.changePageAndFetchItems = (value) => {
        return async (dispatch) => {
            dispatch(this.startFetching());
            dispatch(this.setPaginationPage(value));
            await dispatch(this.fetchItems());
            dispatch(this.stopFetching());
        };
    };
    this.changeLimitAndFetchItems = (value) => {
        return async (dispatch) => {
            dispatch(this.startFetching());
            dispatch(this.setPaginationLimit(value));
            dispatch(this.setPaginationPage(1));
            await dispatch(this.fetchItems());
            dispatch(this.stopFetching());
        };
    };
    this.fetchItemsByCurrentPagination = () => {
        return async (dispatch) => {
            dispatch(this.startFetching());
            await dispatch(this.fetchItems());
            dispatch(this.stopFetching());
        };
    };
    this.saveNewDataOrder = (sequence) => {
        return async (dispatch) => {
            //dispatch(this.startFetching());
            try{
                const response = await API.sort(sequence);
                if(response.status === 200){
                    Notification.success('Сохранено','Очередность записей изменена');
                    //dispatch(this.fetchItemsByCurrentPagination());
                }
            }catch (e){
                dispatch(detectAndShowError(e));
            }
            //dispatch(this.stopFetching());
        };
    };
};
