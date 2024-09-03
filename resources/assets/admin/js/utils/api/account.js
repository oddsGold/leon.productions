import {instance} from "./instance";

const alias = '/account';

export default {
    getCurrentUser: () => {
        return instance.get(alias);
    },
    getSidebarMenus: () => {
        return instance.get(alias + '/menus');
    },
    changePasswordCurrentUser: (o, n, c) => {
        return instance.post(alias + '/password', {old_password: o, password: n, password_confirmation: c})
    },
    changeEmailCurrentUser: (e) => {
        return instance.post(alias + '/email', {email: e})
    }
}
