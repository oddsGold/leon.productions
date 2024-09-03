import React, {useRef, useState} from "react";
import Pagination from "./Pagination";
import DeleteConfirm from "./DeleteConfirm";
import GridDragAndDrop from "./GridDragAndDrop";

export default function Grid({header, data, removeHandler, editHandler, showHandler, dragHandler,  pagination, limit, currentSort, setPage, setSort, setLimit}){

    const [deleteItem, setDeleteItem] = useState(null);

    const gridBodyElement = useRef(null);

    const handleLimit = (e) => {
        if(limit && limit.current && e.currentTarget.value !== limit.current){
            setLimit(e.currentTarget.value);
        }
    };

    const showButtons = removeHandler || editHandler || showHandler;

    return (
        <div className="grid">
            {deleteItem && <DeleteConfirm
                id={deleteItem.id}
                applyHandler={() => {
                    removeHandler(deleteItem);
                    setDeleteItem(null);
                }}
                rejectHandler={() => {
                    setDeleteItem(null);
                }}
            />}
            <div className="row">
                <div className="col">
                    <table className="table grid">
                        <thead>
                            <tr>
                                {dragHandler && <th scope="col" />}
                                {header.map((c,i) => {
                                    return <th
                                        key={i}
                                        scope="col"
                                        className={'text-nowrap ' + ((!dragHandler && c.sortable) ? 'sortable' : '')}
                                        onClick={(!dragHandler && c.sortable) ? () => {setSort(c.name);} : null}
                                    >
                                        {c.label} {
                                        (!dragHandler && c.hasOwnProperty('sortable')) ?
                                            <i className={'fas ' +  (currentSort.replace('-', '') === c.name ? (currentSort.substr(0,1) === '-' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort')} /> : ''
                                        }
                                    </th>
                                })}
                                {showButtons && <th scope="col" className="text-nowrap" />}
                            </tr>
                        </thead>
                        <tbody ref={gridBodyElement}>
                            {data.map((item, index) => {
                                return <tr
                                    key={index}
                                    data-id={(item && item.hasOwnProperty('id')) ? item.id: null}
                                >
                                    {dragHandler && <GridDragAndDrop
                                        containerReference={gridBodyElement}
                                        setNewOrderHandler={dragHandler}
                                    />}
                                    {header.map((h, i) => {
                                        let value = item.hasOwnProperty(h.name) ? item[h.name] : '-';
                                        if(typeof value === "string" && value.length > 80){
                                            value = value.substr(0,80).trim() + '...';
                                        }
                                        return <td
                                            key={i}
                                            className={editHandler && "cursor-pointer"}
                                            scope={i === 0 ? 'row' : ''}
                                            onClick={() => {editHandler && editHandler(item);}}
                                        >{h.image ? <img src={value.url} alt="" className="preview"/> : value}</td>
                                    })}
                                    {showButtons && <td className="text-nowrap">
                                        {showHandler && <a
                                            target="_blank"
                                            href={showHandler(item)}
                                            title="Посмотреть на сайте"
                                            className={`nav-link control show ${!showHandler(item) ? 'disabled' : ''}`}
                                        >
                                            <i className="fas fa-arrow-up-right-from-square" />
                                        </a>}
                                        {editHandler && <div title="Редактировать" className="nav-link control edit" onClick={() => {editHandler(item)}} >
                                            <i className="fas fa-edit" />
                                        </div>}
                                        {removeHandler && <div title="Удалить" className="nav-link control delete" onClick={() => {setDeleteItem(item)}}>
                                            <i className="far fa-trash-alt" />
                                        </div>}
                                    </td>}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {pagination.count > 1 && <Pagination
                        count={pagination.count}
                        current={pagination.current}
                        rangeCount={2}
                        setPage={setPage}
                    />}
                </div>
                <div className="col text-end">
                    {limit && limit.all && limit.current &&
                        <select defaultValue={limit.current} onChange={handleLimit} className="form-select items-per-page">
                            {limit.all.map((count, index) => <option key={index} value={count}>{count}</option>)}
                        </select>
                    }
                </div>
            </div>
        </div>
    );
}
