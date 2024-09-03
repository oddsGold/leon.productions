import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {generatePath, useNavigate} from "react-router-dom";
import LoadingGeneric from "../../generic/Loading";
import Grid from "../../generic/Grid";
import GridTitle from "../../generic/GridTitle";

export default function IndexDefault({
    actions,
    setStateHandler,
    title = null,
    setCreatePath = null,
    showOnSiteHandler = null,
    setEditPath = null,
    isDeletable = true,
    dragAndDropHandler = null,
    titleOtherButtons = null,
    gridHeaderRow = [],
    gridBodyRowHandler = null,
    filters = [], // {handler, title, value, options}
    mainCssClassName = 'index-page'
}){

    const Index = ({data, helper, pagination, fetching, changeLimitAndFetchItems, fetchItemsByCurrentPagination, changePageAndFetchItems,
                       changeSortableAndFetchItems, changeSearchAndFetchItems, clearPaginationItems, deleteItem, dragHandler}) => {

        let {search, sort} = helper;
        const navigate = useNavigate();

        useEffect(() => {
            if(typeof pagination.items.all !== 'number' && !fetching){
                fetchItemsByCurrentPagination();
            }
        });

        useEffect(() => {
            return () => {
                clearPaginationItems();
            };
        }, []);

        return (
            <div className={mainCssClassName}>
                {fetching && <LoadingGeneric />}
                <GridTitle
                    createLinkPath={setCreatePath && setCreatePath()}
                    title={title}
                    searchValue={search}
                    setSearchCallback={changeSearchAndFetchItems}
                    otherButtons={titleOtherButtons}
                    filters={filters}
                />
                <div className="row">
                    <div className="col">
                        <Grid
                            header={gridHeaderRow}
                            data={gridBodyRowHandler ? data.map(gridBodyRowHandler) : data}
                            showHandler={showOnSiteHandler}
                            removeHandler={isDeletable ? deleteItem : null}
                            editHandler={setEditPath ? (item => {
                                navigate(generatePath(setEditPath(), {id: item.id}))
                            }) : null}
                            dragHandler={dragHandler}
                            pagination={{
                                count: pagination.page.all,
                                current: pagination.page.current
                            }}
                            setPage={changePageAndFetchItems}
                            setSort={changeSortableAndFetchItems}
                            currentSort={sort}
                            limit={pagination.limit}
                            setLimit={changeLimitAndFetchItems}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return connect(
        state => ({
            data: setStateHandler(state).data,
            helper: setStateHandler(state).helper,
            pagination: setStateHandler(state).pagination,
            fetching: setStateHandler(state).fetching
        }), ({
            changeLimitAndFetchItems: actions.changeLimitAndFetchItems,
            fetchItemsByCurrentPagination: actions.fetchItemsByCurrentPagination,
            changePageAndFetchItems: actions.changePageAndFetchItems,
            changeSortableAndFetchItems: actions.changeSortableAndFetchItems,
            changeSearchAndFetchItems: actions.changeSearchAndFetchItems,
            clearPaginationItems: actions.clearPaginationItems,
            deleteItem: actions.deleteItem,
            dragHandler: dragAndDropHandler
        })
    )(Index);
};
