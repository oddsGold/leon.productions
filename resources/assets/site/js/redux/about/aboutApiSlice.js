import { api } from "../operations.js";

export const aboutApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        about: builder.query({
            query: () => ({
                url: '/about/information',
            })
        })
    })
});

export const {
    useAboutQuery
} = aboutApiSlice;
