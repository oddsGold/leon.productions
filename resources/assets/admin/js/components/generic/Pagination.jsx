import React from "react";
import PaginationItem from "./PaginationItem";

export default function Pagination({current, count, rangeCount, setPage}){


    const getRange = (r, s = 1) => {
        return [...Array(r).keys()].map(i => i + s);
    };


    return (
        <div className="pagination">
            <ul className="paginate">
                {current > rangeCount + 1 && getRange(
                    current > rangeCount + rangeCount ? rangeCount : current - rangeCount - 1,
                    1
                ).map(p => {
                    return <PaginationItem key={p} page={p} setPage={setPage}/>;
                })}

                {current > rangeCount + rangeCount + 1 &&
                <li className={'points'} >..</li>
                }

                {current > 1 && getRange(
                    current > rangeCount ? rangeCount : current - 1,
                    current > rangeCount + 1 ? current - rangeCount : 1
                ).map(p => {
                    return <PaginationItem key={p} page={p} setPage={setPage}/>;
                })}

                <li className={'active'} >{current}</li>

                {current < count && getRange((
                    count - current > rangeCount) ? rangeCount : count - current,
                    current + 1
                ).map(p => {
                    return <PaginationItem key={p} page={p} setPage={setPage}/>;
                })}

                {current < count - rangeCount - rangeCount - 1 &&
                <li className={'points'} >..</li>
                }

                {current < (count - rangeCount) && getRange(
                    current <= count - rangeCount - rangeCount ? rangeCount : count - current - rangeCount,
                    current <= count - rangeCount - rangeCount ? count - rangeCount + 1 : current + rangeCount + 1
                ).map(p => {
                    return <PaginationItem key={p} page={p} setPage={setPage}/>;
                })}
            </ul>
        </div>
    );
}
