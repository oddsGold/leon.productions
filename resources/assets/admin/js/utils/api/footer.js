import {instance} from "./instance";

const alias = '/footer';

export default {
    contacts: {
        show: () => {
            return instance.get(alias + '/contacts');
        },
        update: (item) => {
            return instance.post(alias + '/contacts', item);
        },
    },
}
