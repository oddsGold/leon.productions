import * as types  from "./types";
import {defaultCase, defaultInitialState} from "../../generic/redux/reducer";


export default (state = defaultInitialState, {type, payload}) => {

    switch (type) {

        case types.START_FETCHING:
        case types.STOP_FETCHING:
        case types.SET_CURRENT_ITEM:
        case types.SET_SORTABLE_FIELD:
        case types.SET_SEARCH:
        case types.SET_PAGINATION_ITEMS:
        case types.SET_PAGINATION_LIMIT:
        case types.SET_PAGINATION_PAGE:
            return defaultCase(types, state, type, payload);

        case types.ADD_ITEM:
            return {
                ...state,
                data: [
                    payload,
                    ...state.data
                ],
            };

        case types.REMOVE_ITEM:
            return {
                ...state,
                data: [
                    ...(state.data.filter(item => item.id !== payload.id))
                ],
            };

        case types.CLEAR_ITEMS:
            return {
                ...state,
                data: [],
                pagination: {
                    ...state.pagination,
                    items: {
                        ...state.pagination.items,
                        all: null
                    },
                    page:{
                        ...state.pagination.page,
                        current: 1,
                        all: 1
                    }
                }
            }

        case types.FETCH_ITEMS:
            return {
                ...state,
                data: [
                    ...state.data,
                    ...payload.data
                ],
                pagination: {
                    ...state.pagination,
                    page: {
                        ...state.pagination.page,
                        all: payload.pagination.pages.all,
                        current: payload.pagination.pages.current
                    },
                    items: {
                        ...state.pagination.items,
                        all: payload.pagination.items
                    }
                },
            }
        default: return state;
    }
};
