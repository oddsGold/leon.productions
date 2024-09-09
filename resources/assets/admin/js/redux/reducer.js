import {combineReducers} from "redux";
import authReducer from "../components/auth/redux/reducer";
import userReducer from "../components/user/user/redux/reducer";
import roleReducer from "../components/user/role/redux/reducer";
import settingsReducer from "../components/settings/redux/reducer";
import adminMenuReducer from "../components/layouts/menu/redux/reducer";
import dashboardReducer from "../components/layouts/dashboard/redux/reducer";
import imageReducer from "../components/image/redux/reducer";
import fileReducer from "../components/file/redux/reducer";
import caseReducer from "../components/case/redux/reducer";
import aboutServiceReducer from "../components/about/service/redux/reducer";
import aboutContactReducer from "../components/about/contact/redux/reducer";
import aboutDescriptionReducer from "../components/about/description/redux/reducer";
import aboutSocialReducer from "../components/about/social/redux/reducer";
import contactContactReducer from "../components/contact/contact/redux/reducer";
import contactDescriptionReducer from "../components/contact/description/redux/reducer";
import contactSocialReducer from "../components/contact/social/redux/reducer";
import footerContactReducer from "../components/footer/contact/redux/reducer";


export default combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    image: imageReducer,
    file: fileReducer,
    case: caseReducer,
    about: combineReducers({
        service: aboutServiceReducer,
        contact: aboutContactReducer,
        description: aboutDescriptionReducer,
        social: aboutSocialReducer
    }),
    contact: combineReducers({
        contact: contactContactReducer,
        description: contactDescriptionReducer,
        social: contactSocialReducer
    }),
    footer: combineReducers({
        contact: footerContactReducer
    }),
    user: combineReducers({
        user: userReducer,
        role: roleReducer,
    }),
    layout: combineReducers({
        menu: adminMenuReducer,
        dashboard: dashboardReducer,
    }),
});
