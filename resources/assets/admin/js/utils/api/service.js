import {defaultRequests, instance} from "./instance";

const alias = '/about/services';

const requests = defaultRequests(alias);
requests.sort = (sequence) => {
    return instance.post(alias + '/sort' , {sequence});
};

export default requests;
