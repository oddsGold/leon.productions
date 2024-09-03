import {defaultRequests, instance} from "./instance";

const alias = '/files';
const requests = defaultRequests(alias);
export default {
    index: requests.index,
    show: requests.show,
    delete: requests.delete,
    create: (file) => {
        const data = new FormData();
        data.append('data', file);
        return instance.post(alias, data);
    }
}
