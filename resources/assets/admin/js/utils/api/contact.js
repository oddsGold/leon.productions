import {instance} from "./instance";

const alias = '/contact';

export default {
    description: {
        show: () => {
            return instance.get(alias + '/description');
        },
        update: (item) => {
            return instance.post(alias + '/description', item);
        },
    },
    contacts: {
        show: () => {
            return instance.get(alias + '/contacts');
        },
        update: (item) => {
            return instance.post(alias + '/contacts', item);
        },
    },
    social: {
        show: () => {
            return instance.get(alias + '/social/media');
        },
        update: (item) => {
            return instance.post(alias + '/social/media', item);
        },
    },
}
