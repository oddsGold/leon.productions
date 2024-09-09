import React from 'react';
import * as actions from "./redux/actions";
import routes from "../../routes";
import IndexDefault from "../../generic/pages";

const localActions = {
    ...actions,
    changeSearchAndFetchItems: null,
};

export default IndexDefault({
    actions: localActions,
    changeSearchAndFetchItems: null,
    setStateHandler: (state) => {
        return state.about.service;
    },
    title: "Услуги",
    setCreatePath: () => {return routes.about.children.services.children.create.path;},
    setEditPath: () => {return routes.about.children.services.children.edit.path;},
    gridHeaderRow: [
        {name: 'id', label: '#', sortable: true},
        {name: 'name', label: 'Наименоавние'},
        {name: 'user', label: 'Автор'},
        {name: 'created_at', label: 'Дата создания'},
        {name: 'updated_at', label: 'Дата модификации'}
    ],
    dragAndDropHandler: actions.saveNewDataOrder
});
