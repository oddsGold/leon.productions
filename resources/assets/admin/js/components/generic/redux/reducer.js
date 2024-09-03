export const defaultInitialState = {
    data: [],
    current: null,
    helper: {
        search: '',
        sort: '-id'
    },
    fetching: false,
    pagination: {
        items:{
            all: null
        },
        page: {
            current: 1,
            all: 1
        },
        limit: {
            current: 30,
            all: [10,30,50,'all']
        },
    }
};

export const defaultCase = (types, state, type, payload) => {

    switch (type){

        case types.FETCH_ITEMS:
            return {
                ...state,
                data: [...payload.data],
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

        case types.START_FETCHING:
            return {...state, fetching: true};

        case types.STOP_FETCHING:
            return {...state, fetching: false};

        case types.SET_CURRENT_ITEM:
            return {...state, current: payload};

        case types.SET_SORTABLE_FIELD:
            return {...state, helper: {...state.helper, sort: payload}};

        case types.SET_SEARCH:
            return {...state, helper: {...state.helper, search: payload}};

        case types.SET_PAGINATION_ITEMS:
            return {...state, pagination: {...state.pagination, items: {...state.pagination.items, all: payload}}};

        case types.SET_PAGINATION_LIMIT:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    limit: {...state.pagination.limit, current: payload},
                }
            };

        case types.SET_PAGINATION_PAGE:
            return {...state, pagination: {...state.pagination, page: {...state.pagination.page, current: payload}}};

        default: return state;
    }
};
