import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        return headers;
    }
});

export const api = createApi({
    baseQuery,
    endpoints: builder => ({})
})
