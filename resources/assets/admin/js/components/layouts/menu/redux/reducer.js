import {FETCH_SIDEBAR_MENU, START_FETCHING, STOP_FETCHING} from "./types";

const initialState = {
    data: null,
    fetching: false
};

export default (state = initialState, {type, payload}) => {

    switch (type) {

        case FETCH_SIDEBAR_MENU:
            return { ...state, data: payload};

        case START_FETCHING:
            return {...state, fetching: true};

        case STOP_FETCHING:
            return {...state, fetching: false};

        default: return state;
    }
};
