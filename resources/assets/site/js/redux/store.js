import {configureStore} from "@reduxjs/toolkit";
import {api} from "./operations.js";
import casesReducer from "../redux/cases/slice";
import aboutReducer from "../redux/about/slice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        cases: casesReducer,
        about: aboutReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});
