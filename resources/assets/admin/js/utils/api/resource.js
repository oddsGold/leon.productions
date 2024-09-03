import {instance} from "./instance";

const alias = '/resources';

export default {
    index: () => {
        return instance.get(alias);
    },
}
