import {applyMiddleware, createStore, compose} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

export default createStore(
    reducer,
    compose(
        applyMiddleware(thunk)
       // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
