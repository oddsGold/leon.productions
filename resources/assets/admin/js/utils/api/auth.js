import axios from "axios";
import {instance} from "./instance";

const auth = (() => {

    let token = null;
    let isTfaEnabled = false;
    let tfaQrCode = null;
    let isRefreshingToken = false;
    let refreshSubscribers = [];

    return {

        setToken: (t) => {
            token = t;
        },
        getToken: () => token,
        isRefreshingToken: () => isRefreshingToken,
        setRefreshingToken: (v) => isRefreshingToken = v,
        isRefreshUrl: url => String(url).includes('/auth/refresh-tokens'), //TODO token !== null
        isTokenExpiredError: response => response.status === 401 && token !== null, //TODO token !== null
        addRefreshSubscriber: s => refreshSubscribers.push(s),
        onTokenRefreshed: t => refreshSubscribers = refreshSubscribers.filter(c => c(t)),
        checkToken: (r) => {
            if(r.data['access-token']){
                return r.data['access-token'];
            }
            return false
        },
        checkTfa: (r) => {
            if(r.data['tfa']){
                return r.data['tfa'];
            }
            return false
        },
        refresh: () => {
            return instance.post('/auth/refresh-tokens', {});
        },
        login: (login, password) => {
            return instance.post('/auth/login', {login,password})
                .then(r => {
                    let authentication = false;
                    if(r.data['access-token']){
                        token = r.data['access-token'];

                        if(!r.data['tfa']){
                            authentication = true;
                        }

                        if(r.data['tfa']){
                            isTfaEnabled = true;
                            tfaQrCode = r.data['tfa_qr_code'];
                        }
                    }
                    return {authentication, isTfaEnabled, tfaQrCode};
                });
        },
        loginTFA: (code) => {
            return instance.post('/auth/tfa', {code});
        },
        forgotTFA: () => {
            return instance.get('/auth/tfa/forgot');
        },
        isEnabledTfa: () => {

        },
        logout: () => {
            return instance.post('/auth/logout', {})
                .then(r => {
                    token = null;
                });
        },
    }
})();

instance.interceptors.request.use((config) => {
    if(auth.getToken() && String(auth.getToken()).length > 10){
        config.headers.Authorization = 'Bearer ' + auth.getToken();
    }
    return config;
});

instance.interceptors.response.use(r => r, (error) => {

    if(auth.isTokenExpiredError(error.response) && !auth.isRefreshUrl(error.config.url)){

        if(!auth.isRefreshingToken()){
            auth.setRefreshingToken(true);

            return new Promise((resolve, reject) => {
                auth.refresh()
                    .then(r => {
                        if(auth.checkToken(r)){
                            auth.setToken(auth.checkToken(r));
                            auth.onTokenRefreshed(auth.getToken());
                        }
                    })
                    .then(() => {
                        auth.setRefreshingToken(false);
                    })
                    .catch((e) => {
                        auth.setToken(null);
                        auth.setRefreshingToken(false);
                        reject(e);
                    })
                auth.addRefreshSubscriber((token) => {
                    error.config.headers.Authorization = 'Bearer ' + token;
                    resolve(axios(error.config));
                });
            });

        }

        return new Promise((resolve) => {
            auth.addRefreshSubscriber((token) => {
                error.config.headers.Authorization = 'Bearer ' + token;
                resolve(axios(error.config));
            });
        });
    }

    return Promise.reject(error);
});

export default {

    login: (login, password) => {
        return auth.login(login, password);
    },
    loginTFA: (code) => {
        return auth.loginTFA(code)
            .then(r => {
                if(auth.checkToken(r)){
                    auth.setToken(auth.checkToken(r));
                    return true;
                }
                return false;
            });
    },
    forgotTFA: () => {
        return auth.forgotTFA();
    },
    refreshToken: () => {
        return auth.refresh()
            .then(r => {
                if(auth.checkToken(r)){
                    auth.setToken(auth.checkToken(r));
                    return true;
                }
                return false;
            });
    },
    logout: () => {
        return auth.logout();
    }
};
