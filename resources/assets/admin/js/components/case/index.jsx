import React from 'react';
import * as actions from "./redux/actions";
import routes from "../routes";
import IndexDefault from "../generic/pages";

const localActions = {
    ...actions,
    changeSearchAndFetchItems: null,
};
export default IndexDefault({
    actions: localActions,
    setStateHandler: (state) => {
        return state.case;
    },
    title: "Кейсы",
    setCreatePath: () => {return routes.cases.children.create.path;},
    setEditPath: () => {return routes.cases.children.edit.path;},
    gridHeaderRow: [
        {name: 'id', label: '#', sortable: true},
        {name: 'description', label: 'Описание'},
        {name: 'user', label: 'Автор'},
        {name: 'created_at', label: 'Дата создания'},
        {name: 'updated_at', label: 'Дата модификации'}
    ],
    gridBodyRowHandler: (row) => {
        let description = String(row['description']);
        if(description.length > 50){
            row['description'] = description.substring(0, 47) + '...';
        }
        return row;
    },
    dragAndDropHandler: actions.saveNewDataOrder
});
