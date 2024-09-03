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

import useRoutes from "../utils/hooks/useRoutes";
import useRoute from "../utils/hooks/useRoute";
import useRouteCreate from "../utils/hooks/useRouteCreate";
import useRouteEdit from "../utils/hooks/useRouteEdit";


const base = '/admin';

export default useRoutes(base, {


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
    notFound: useRoute('*', NotFound, {}, false)

});
