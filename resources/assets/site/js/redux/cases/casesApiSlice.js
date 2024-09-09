import { api } from "../operations.js";

export const casesApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        video: builder.query({
            query: () => ({
                url: '/video/cases',
            }),
            transformResponse: (response) => response.data,
        })
    })
});

export const {
    useVideoQuery,
} = casesApiSlice;
