import React from 'react';
import * as actions from "./redux/actions";
import routes from '../../routes';
import IndexDefault from "../../generic/pages";

export default IndexDefault({
    actions,
    setStateHandler: (state) => {
        return state.user.user;
    },
    title: "Пользователи",
    setCreatePath: () => {return routes.users.children.create.path;},
    setEditPath: () => {return routes.users.children.edit.path;},
    gridHeaderRow: [
        {name: 'id', label: '#'},
        {name: 'login', label: 'Наименование'},
        {name: 'last_login_at', label: 'Дата Последнего входа'},
        {name: 'created_at', label: 'Дата создания'},
        {name: 'updated_at', label: 'Дата модификации'}
    ]
});
