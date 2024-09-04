import { api } from "../operations.js";

export const casesApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        users: builder.query({
            query: () => ({
                url: '/users',
            })
        })
    })
});

export const {
    useUsersQuery,
} = casesApiSlice;
