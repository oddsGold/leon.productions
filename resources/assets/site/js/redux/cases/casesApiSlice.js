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

let videoLocalData = null;
if(window.appData && window.appData.cases){
    videoLocalData = {
        data: window.appData.cases,
        error: false,
        isLoading: false
    };
}

export const {
    useVideoQuery,
} = (videoLocalData ? {useVideoQuery: () => videoLocalData} : casesApiSlice);
