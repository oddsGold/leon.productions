import React from "react";
import NotFound from "./error/NotFound";
import Dashboard from "./layouts/dashboard";
import Account from "./auth/Account";
import Role from "./user/role";
import RoleCreate from "./user/role/create";
import RoleEdit from "./user/role/edit";
import User from "./user/user";
import UserCreate from "./user/user/create";
import UserEdit from "./user/user/edit";
import Case from "./case";
import CaseCreate from "./case/create";
import CaseEdit from "./case/edit";
import AboutService from "./about/service";
import AboutServiceCreate from "./about/service/create";
import AboutServiceEdit from "./about/service/edit";
import AboutDescriptionEdit from "./about/description/edit";
import AboutSocialEdit from "./about/social/edit";
import AboutContactEdit from "./about/contact/edit";
import ContactDescriptionEdit from "./contact/description/edit";
import ContactSocialEdit from "./contact/social/edit";
import ContactContactEdit from "./contact/contact/edit";
import FooterContactEdit from "./footer/contact/edit";
import useRoutes from "../utils/hooks/useRoutes";
import useRoute from "../utils/hooks/useRoute";
import useRouteCreate from "../utils/hooks/useRouteCreate";
import useRouteEdit from "../utils/hooks/useRouteEdit";


const base = '/admin';

export default useRoutes(base, {

    cases: useRoute('/cases', <Case />, {
        ...useRouteCreate(<CaseCreate />),
        ...useRouteEdit(<CaseEdit />),
    }),
    about: useRoute('/about', null, {
        services: useRoute('services', <AboutService />, {
            ...useRouteCreate(<AboutServiceCreate />),
            ...useRouteEdit(<AboutServiceEdit />),
        }),
        description: useRoute('description', <AboutDescriptionEdit />),
        contacts: useRoute('contacts', <AboutContactEdit />),
        socials: useRoute('socials', <AboutSocialEdit />),
    }),
    contact: useRoute('/contact', null, {
        description: useRoute('description', <ContactDescriptionEdit />),
        contacts: useRoute('contacts', <ContactContactEdit />),
        socials: useRoute('socials', <ContactSocialEdit />),
    }),
    footer: useRoute('/footer', null, {
        contacts: useRoute('contacts', <FooterContactEdit />),
    }),
    roles: useRoute('/roles', <Role />, {
        ...useRouteCreate(<RoleCreate />),
        ...useRouteEdit(<RoleEdit />),
    }),
    users: useRoute('/users', <User />, {
        ...useRouteCreate(<UserCreate />),
        ...useRouteEdit(<UserEdit />),
    }),
    account: useRoute('/account', <Account />, {}, false),
    dashboard: useRoute('', <Dashboard />, {}),
    notFound: useRoute('*', <NotFound />, {}, false)

});
