import {START_FETCHING, STOP_FETCHING, SET_CURRENT_ITEM} from "./types";
import detectAndShowError from "../../../../utils/DetectExceptionAndShow";
import {Notification} from "../../../../utils/Notification";
import API from "../../../../utils/api";

export const startFetching = () => ({type: START_FETCHING});
export const stopFetching = () => ({type: STOP_FETCHING});

export const setCurrentItem = (item) => ({type: SET_CURRENT_ITEM, payload: item});
export const clearCurrentItem = () => ({type: SET_CURRENT_ITEM, payload: null});
export const fetchItemAndSetCurrent = () => {
    return async (dispatch) => {
        dispatch(startFetching());
        let item = null;
        try{
            const response = await API.contact.social.show();
            if(
                response && response.data &&
                Object.prototype.toString.call(response.data) === '[object Object]'
            ){
                item = response.data;
            }
        }catch (e){
            dispatch(detectAndShowError(e));
        }
        dispatch(setCurrentItem(item))
        dispatch(stopFetching());
    };
};
export const updateItemAndSetCurrent = (item) => {
    return async (dispatch) => {
        dispatch(startFetching());
        try{
            const response = await API.contact.social.update(item);
            if(
                response && response.data &&
                Object.prototype.toString.call(response.data) === '[object Object]'
            ){
                Notification.success('Сохранено','Запись успешно изменена');
                dispatch(setCurrentItem(response.data));
            }
        }catch (e){
            dispatch(detectAndShowError(e));
        }
        dispatch(stopFetching());
    };
};
