import * as types from "./types";
import {defaultCase, defaultInitialState} from "../../../generic/redux/reducer";

const initialState = {
    ...defaultInitialState,
    resources: null,
};

export default (state = initialState, {type, payload}) => {

    switch (type) {

        case types.FETCH_ITEMS:
        case types.START_FETCHING:
        case types.STOP_FETCHING:
        case types.SET_CURRENT_ITEM:
        case types.SET_SORTABLE_FIELD:
        case types.SET_SEARCH:
        case types.SET_PAGINATION_ITEMS:
        case types.SET_PAGINATION_LIMIT:
        case types.SET_PAGINATION_PAGE:
            return defaultCase(types, state, type, payload);

        case types.FETCH_RESOURCES:
            return {...state, resources: payload};

        default: return state;
    }
};
