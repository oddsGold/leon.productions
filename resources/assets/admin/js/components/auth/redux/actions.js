import {
    CLEAR_AUTHENTICATION, CLEAR_EMAIL_FORM,
    CLEAR_PASSWORD_FORM, DISABLED_EMAIL_FORM_ERRORS,
    DISABLED_EMAIL_FORM_FIELD_ERROR,
    DISABLED_PASSWORD_FORM_ERRORS,
    DISABLED_PASSWORD_FORM_FIELD_ERROR,
    DISABLED_TFA_AUTHENTICATION,
    ENABLED_EMAIL_FORM_FIELD_ERROR,
    ENABLED_PASSWORD_FORM_FIELD_ERROR,
    ENABLED_TFA_AUTHENTICATION,
    HIDE_EMAIL_FORM,
    HIDE_PASSWORD_FORM,
    SET_AUTHENTICATION_USER, SET_EMAIL_FORM_FIELD,
    SET_PASSWORD_FORM_FIELD,
    SET_TFA_QR_CODE,
    SHOW_EMAIL_FORM,
    SHOW_PASSWORD_FORM,
    SUCCESSFUL_AUTHENTICATION,
    TRIED_REFRESH_AUTHENTICATION
} from "./types";
import {startFetching, stopFetching} from "../../settings/redux/actions";
import API from "../../../utils/api";
import {Notification} from "../../../utils/Notification";
import account from "../../../utils/api/account";
import auth from "../../../utils/api/auth";

export const triedRefreshAuthentication = () => ({type: TRIED_REFRESH_AUTHENTICATION});
export const successfulAuthentication = () => ({type: SUCCESSFUL_AUTHENTICATION});
export const clearAuthentication = () => ({type: CLEAR_AUTHENTICATION});

export const setAuthUser = (login, email, role) => ({type: SET_AUTHENTICATION_USER, payload: {login, email, role}});
export const enabledTfaAuthentication = () => ({type: ENABLED_TFA_AUTHENTICATION});
export const disabledTfaAuthentication = () => ({type: DISABLED_TFA_AUTHENTICATION});
export const setTfaQrCode = (code) => ({type: SET_TFA_QR_CODE, payload: code});
export const clearTfaQrCode = () => (dispatch) => dispatch(setTfaQrCode(null));

export const clearPasswordForm = () => ({type: CLEAR_PASSWORD_FORM});
export const clearEmailForm = () => ({type: CLEAR_EMAIL_FORM});
export const showPasswordForm = () => ({type: SHOW_PASSWORD_FORM});
export const hidePasswordForm = () => ({type: HIDE_PASSWORD_FORM});
export const showEmailForm = () => ({type: SHOW_EMAIL_FORM});
export const hideEmailForm = () => ({type: HIDE_EMAIL_FORM});

export const enabledPasswordFormFieldError = (name) => ({type: ENABLED_PASSWORD_FORM_FIELD_ERROR, payload: name});
export const disabledPasswordFormFieldError = (name) => ({type: DISABLED_PASSWORD_FORM_FIELD_ERROR, payload: name});
export const disabledPasswordFormErrors = () => ({type: DISABLED_PASSWORD_FORM_ERRORS});
export const disabledEmailFormErrors = () => ({type: DISABLED_EMAIL_FORM_ERRORS});
export const enabledEmailFormFieldError = (name) => ({type: ENABLED_EMAIL_FORM_FIELD_ERROR, payload: name});
export const disabledEmailFormFieldError = (name) => ({type: DISABLED_EMAIL_FORM_FIELD_ERROR, payload: name});

export const setPasswordFormField = (name, value) => {
    return (dispatch, getState) => {
        const {auth} = getState();
        const {data} = auth.forms.password;
        if(typeof data[name] !== 'undefined'){
            if(data[name].value !== value){
                dispatch({type: SET_PASSWORD_FORM_FIELD, payload: {name, value}});
            }
        }
    };
};

export const setEmailFormField = (name, value) => {
    return (dispatch, getState) => {
        const {auth} = getState();
        const {data} = auth.forms.email;
        if(typeof data[name] !== 'undefined'){
            if(data[name].value !== value){
                dispatch({type: SET_EMAIL_FORM_FIELD, payload: {name, value}});
            }
        }
    };
};

export const login = (login, password) => {
    return async (dispatch, getState) => {

        const {auth} = getState();
        const {authenticated} = auth;

        dispatch(startFetching());

        try {
            const auth = await API.auth.login(login, password);
            if(auth.authentication){
                dispatch(successfulAuthentication());
                dispatch(clearTfaQrCode());
                dispatch(disabledTfaAuthentication());
            }

            if(!auth.authentication && auth.isTfaEnabled){
                dispatch(enabledTfaAuthentication());
                if(auth.tfaQrCode){
                    dispatch(setTfaQrCode(auth.tfaQrCode));
                }
            }

        } catch (e) {

            if(e.response && e.response.status && e.response.data && e.response.data.errors){
                if(e.response.status === 429){
                    Notification.error(null, "Слишком много попыток. Попробуйте через пару минут");
                }else if(e.response.status === 422){
                    Notification.error(null, "Неверный логин или пароль");
                }else{
                    const errors = e.response.data.errors;
                    for(let i in errors){
                        if(errors.hasOwnProperty(i))
                            Notification.error(null, errors[i][0]);
                    }
                }
            }

            if(authenticated){
                dispatch(clearAuthentication())
            }
        }

        dispatch(stopFetching());
    }
};

export const loginTFA = (code) => {
    return async (dispatch, getState) => {

        const {auth} = getState();
        const {authenticated} = auth;

        dispatch(startFetching());

        try {
            const authentication = await API.auth.loginTFA(code);
            if(authentication){
                dispatch(successfulAuthentication());
                dispatch(clearTfaQrCode());
                dispatch(disabledTfaAuthentication());
            }
        } catch (e) {
            if(e.response && e.response.status && e.response.data && e.response.data.errors){
                if(e.response.status === 429){
                    Notification.error(null, "Слишком много попыток. Попробуйте позже");
                }else if(e.response.status === 422){
                    Notification.error(null, "Неверный код");
                }else{
                    const errors = e.response.data.errors;
                    for(let i in errors){
                        if(errors.hasOwnProperty(i))
                            Notification.error(null, errors[i][0]);
                    }
                }
            }
            if(authenticated){
                dispatch(clearAuthentication())
            }
        }

        dispatch(stopFetching());
    }
};

export const refreshAuthentication = () => {
    return async (dispatch, getState) => {

        const {auth} = getState();
        const {authenticated} = auth;

        dispatch(startFetching());

        try {
            const authentication = await API.auth.refreshToken();
            dispatch(stopFetching());
            if(authentication){
                await dispatch(successfulAuthentication());
            }
        } catch (e) {
            dispatch(stopFetching());
            if(authenticated){
                dispatch(clearAuthentication())
            }
        }
        await dispatch(triedRefreshAuthentication());
        //dispatch(stopFetching());
    }
};

export const fetchUser = () => {
    return async (dispatch) => {

        //dispatch(startFetching());
        try {
            const response = await API.account.getCurrentUser();
            if(response && response.data && response.data.data && response.status === 200){
                dispatch(setAuthUser(
                    response.data.data.login,
                    response.data.data.email,
                    response.data.data.role.name
                ));

            }
        } catch (e) {

        }
        //dispatch(stopFetching());
    };
};

export const logout = () => {
    return async (dispatch) => {

        dispatch(startFetching());
        try {
            await API.auth.logout();
        } catch (e) {

        }
        await dispatch(clearAuthentication());
        dispatch(stopFetching());
    }
};

export const forgotTFA = () => {
    return async (dispatch) => {
        dispatch(startFetching());
        try {
            await API.auth.forgotTFA();
        } catch (e) {

        }
        dispatch(stopFetching());
    }
};

export const changePassword = (o, n, c) => {
    return async (dispatch) => {
        dispatch(startFetching());
        try {
            const response = await API.account.changePasswordCurrentUser(o, n, c);
            if(response && response.status === 200){
                dispatch(clearPasswordForm());
                dispatch(hidePasswordForm());
                Notification.success(null, 'Пароль успешно изменен')
            }
        } catch (e) {
            if(e.response && e.response.status === 422 && e.response.data && e.response.data.errors){
                const errors = e.response.data.errors;
                dispatch(disabledPasswordFormErrors());
                for(let i in errors){
                    if(errors.hasOwnProperty(i)){
                        enabledEmailFormFieldError(i);
                        Notification.error(null, errors[i][0]);
                    }
                }
            }
        }
        dispatch(stopFetching());
    }
};

export const changeEmail = (newEmail) => {
    return async (dispatch, getState) => {

        const {auth} = getState();
        const {login,role} = auth;

        dispatch(startFetching());
        try {
            const response = await API.account.changeEmailCurrentUser(newEmail);
            if(response && response.status === 200){
                dispatch(setAuthUser(login,newEmail,role));
                dispatch(clearEmailForm());
                dispatch(hideEmailForm());
                Notification.success(null, 'Email успешно изменен')
            }
        } catch (e) {
            if(e.response && e.response.status === 422 && e.response.data && e.response.data.errors){
                const errors = e.response.data.errors;
                dispatch(disabledEmailFormErrors());
                for(let i in errors){
                    if(errors.hasOwnProperty(i)){
                        enabledEmailFormFieldError(i);
                        Notification.error(null, errors[i][0]);
                    }
                }
            }
        }
        dispatch(stopFetching());
    }
}
