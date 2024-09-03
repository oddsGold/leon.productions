import API from "../../../../utils/api";
import * as types from "./types";
import detectAndShowError from "../../../../utils/DetectExceptionAndShow";
import {default as defaultActions} from "../../../generic/redux/actions";

const actions = new defaultActions(types, (state) => {
    return state.user.user;
}, API.user.user);

export const setPaginationLimit = actions.setPaginationLimit;
export const setPaginationPage = actions.setPaginationPage;
export const setPaginationItems = actions.setPaginationItems;
export const clearPaginationItems = actions.clearPaginationItems;
export const setSearch = actions.setSearch;
export const clearCurrentItem = actions.clearCurrentItem;
export const startFetching = actions.startFetching;
export const stopFetching = actions.stopFetching;
export const setSortableField = actions.setSortableField;
export const fetchItems = actions.fetchItems;
export const fetchItemByIdAndSetCurrent = actions.fetchItemByIdAndSetCurrent;
export const createItemAndSetCurrent = actions.createItemAndSetCurrent;
export const updateItemAndSetCurrent = actions.updateItemAndSetCurrent;
export const deleteItem = actions.deleteItem;
export const changeSearchAndFetchItems = actions.changeSearchAndFetchItems;
export const changeSortableAndFetchItems = actions.changeSortableAndFetchItems;
export const changePageAndFetchItems = actions.changePageAndFetchItems;
export const changeLimitAndFetchItems = actions.changeLimitAndFetchItems;
export const fetchItemsByCurrentPagination = actions.fetchItemsByCurrentPagination;

export const clearRoles = () => ({type: types.FETCH_ROLES, payload: null});
export const fetchRoles = () => {
    return async (dispatch) => {
        dispatch(startFetching());
        let categories = [];
        try{
            const response = await API.user.role.index(1, 1000);
            if(response && response.data && response.data.data && Array.isArray(response.data.data)){
                categories = response.data.data;
            }
        }catch (e){
            dispatch(detectAndShowError(e));
        }
        dispatch({
            type: types.FETCH_ROLES,
            payload: categories
        });
        dispatch(stopFetching());
    };
};
