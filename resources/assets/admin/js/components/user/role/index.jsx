import React from 'react';
import * as actions from "./redux/actions";
import routes from '../../routes';
import IndexDefault from "../../generic/pages";

export default IndexDefault({
    actions,
    setStateHandler: (state) => {
        return state.user.role;
    },
    title: "Роли пользователей",
    setCreatePath: () => {return routes.roles.children.create.path;},
    setEditPath: () => {return routes.roles.children.edit.path;},
    gridHeaderRow: [
        {name: 'id', label: '#'},
        {name: 'label', label: 'Наименование'},
        {name: 'created_at', label: 'Дата создания'},
        {name: 'updated_at', label: 'Дата модификации'}
    ]
});
