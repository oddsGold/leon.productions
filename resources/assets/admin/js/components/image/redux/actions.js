import API from "../../../utils/api";
import * as types from "./types";
import {default as defaultActions} from "../../generic/redux/actions";
import {Notification} from "../../../utils/Notification";
import detectAndShowError from "../../../utils/DetectExceptionAndShow";


const actions = new defaultActions(types, (state) => {
    return state.image;
}, API.image);

export const setPaginationLimit = actions.setPaginationLimit;
export const setPaginationPage = actions.setPaginationPage;
export const setPaginationItems = actions.setPaginationItems;
export const clearPaginationItems = actions.clearPaginationItems;
export const setSearch = actions.setSearch;
export const setCurrentItem = actions.setCurrentItem;
export const clearCurrentItem = actions.clearCurrentItem;
export const clearItems = () => ({type: types.CLEAR_ITEMS});
export const startFetching = actions.startFetching;
export const stopFetching = actions.stopFetching;
export const setSortableField = actions.setSortableField;
export const fetchItems = actions.fetchItems;
export const fetchItemByIdAndSetCurrent = actions.fetchItemByIdAndSetCurrent;
export const createItemAndSetCurrent = actions.createItemAndSetCurrent;
export const createItemAndAddToItems = (item) => {
    return async (dispatch, getState) => {
        await dispatch(actions.createItemAndSetCurrent(item));
        const {current} = getState().image;
        if(current){
            dispatch({type: types.ADD_ITEM, payload: current});
            dispatch(actions.clearCurrentItem());
        }
    };
};
export const updateItemAndSetCurrent = actions.updateItemAndSetCurrent;
export const deleteItem = (item) => {
    return async (dispatch) => {
        try{
            dispatch(actions.startFetching());
            const response = await API.image.delete(item.id);
            dispatch(actions.stopFetching());
            if(response.status === 200){
                Notification.success('Удалено','Запись успешно удалена');
                dispatch({type: types.REMOVE_ITEM, payload: item});
            }
        }catch (e){
            dispatch(detectAndShowError(e));
        }
    };
};
export const changeSearchAndFetchItems = actions.changeSearchAndFetchItems;
export const changeSortableAndFetchItems = actions.changeSortableAndFetchItems;
export const changePageAndFetchItems = actions.changePageAndFetchItems;
export const incrementPageAndFetchItems = () => {
    return async (dispatch, getState) => {
        const {pagination, fetching} = getState().image;
        const {page} = pagination;
        const {current, all} = page;
        if(!fetching && current < all){
            await dispatch(actions.changePageAndFetchItems(current + 1));
        }
    }
};
export const changeLimitAndFetchItems = actions.changeLimitAndFetchItems;
export const fetchItemsByCurrentPagination = actions.fetchItemsByCurrentPagination;
