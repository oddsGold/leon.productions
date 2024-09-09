import {defaultRequests, instance} from "./instance";

const alias = '/cases';

const requests = defaultRequests(alias);
requests.sort = (sequence) => {
    return instance.post(alias + '/sort' , {sequence});
};

export default requests;
