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

export const {
    useContactsQuery,
    useFooterContactsQuery
} = contactsApiSlice;
