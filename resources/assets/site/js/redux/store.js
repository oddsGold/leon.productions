import {configureStore} from "@reduxjs/toolkit";
import {api} from "./operations.js";
import casesReducer from "../redux/cases/slice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        cases: casesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});
