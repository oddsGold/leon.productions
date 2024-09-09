import { api } from "../operations.js";

export const casesApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        video: builder.query({
            query: () => ({
                url: '/video/cases',
            }),
            transformResponse: (response, meta, arg) => response.data,
        })
    })
});

export const {
    useVideoQuery,
} = casesApiSlice;
