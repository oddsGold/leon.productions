import { api } from "../operations.js";

export const contactsApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        contacts: builder.query({
            query: () => ({
                url: '/contact/information',
            })
        }),
        footerContacts: builder.query({
            query: () => ({
                url: '/footer/information',
            })
        }),
    })
});

let contactLocalData = null;
if(window.appData && window.appData.contact){
    contactLocalData = {
        data: window.appData.contact,
        error: false,
        isLoading: false
    }
}

let footerLocalData = null;
if(window.appData && window.appData.footer){
    footerLocalData = {
        data: window.appData.footer,
        error: false,
        isLoading: false
    }
}

export const {
    useContactsQuery,
    useFooterContactsQuery
} = ((contactLocalData && footerLocalData) ? {
    useContactsQuery: () => contactLocalData,
    useFooterContactsQuery: () => footerLocalData
} : contactsApiSlice);
