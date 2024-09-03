import axios from "axios";

export const instance = axios.create({
    baseURL : '/api',
    withCredentials: true,
    headers: {'Accept': 'application/json'}
});

export const defaultRequests = (alias) => {
    return {
        index: (page,limit,search,sort) => {
            let params = {
                page: page,
                limit: limit
            };
            if(sort){
                params.sort = sort;
            }
            if(search){
                params.search = search;
            }
            return instance.get(alias, {params: params});
        },
        show: (id) => {
            return instance.get(alias + '/' + parseInt(id));
        },
        create: (item) => {
            return instance.post(alias, item);
        },
        update: (item) => {
            return instance.post(alias + '/' + parseInt(item.id), item);
        },
        delete: (id) => {
            return instance.delete(alias + '/' + parseInt(id))
        }

    };
};
