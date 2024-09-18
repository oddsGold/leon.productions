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

let aboutLocalData = null;
if(window.appData && window.appData.about){
    aboutLocalData = {
        data: window.appData.about,
        error: false,
        isLoading: false
    };
}

export const {
    useAboutQuery
} = (aboutLocalData ? {useAboutQuery: () => aboutLocalData} : aboutApiSlice);
