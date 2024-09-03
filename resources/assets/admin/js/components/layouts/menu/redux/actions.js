import {FETCH_SIDEBAR_MENU, START_FETCHING, STOP_FETCHING} from "./types";
import API from "../../../../utils/api";
import detectAndShowError from "../../../../utils/DetectExceptionAndShow";

export const startFetching = () => ({type: START_FETCHING});
export const stopFetching = () => ({type: STOP_FETCHING});

export const fetchMenu = () => {
    return async (dispatch) => {
        dispatch(startFetching());
        try {
            const response = await API.account.getSidebarMenus();
            if(response && response.data && response.data.data && response.status === 200){
                dispatch({type: FETCH_SIDEBAR_MENU, payload: response.data.data})
            }
        } catch (e) {
            dispatch(detectAndShowError(e));
        }
        dispatch(stopFetching());
    }
};
