import {START_FETCHING, STOP_FETCHING, SET_CURRENT_ITEM} from "./types";

const initialState = {
    fetching: false,
    current: null,
};

export default (state = initialState, {type, payload}) => {

    switch (type) {

        case SET_CURRENT_ITEM:
            return {...state, current: payload};

        case START_FETCHING:
            return {...state, fetching: true};

        case STOP_FETCHING:
            return {...state, fetching: false};

        default: return state;
    }
};
