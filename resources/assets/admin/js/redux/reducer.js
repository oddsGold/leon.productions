import {combineReducers} from "redux";
import authReducer from "../components/auth/redux/reducer";
import userReducer from "../components/user/user/redux/reducer";
import roleReducer from "../components/user/role/redux/reducer";
import settingsReducer from "../components/settings/redux/reducer";
import adminMenuReducer from "../components/layouts/menu/redux/reducer";
import dashboardReducer from "../components/layouts/dashboard/redux/reducer";
import imageReducer from "../components/image/redux/reducer";
import fileReducer from "../components/file/redux/reducer";


export default combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    image: imageReducer,
    file: fileReducer,
    user: combineReducers({
        user: userReducer,
        role: roleReducer,
    }),
    layout: combineReducers({
        menu: adminMenuReducer,
        dashboard: dashboardReducer,
    }),
});
