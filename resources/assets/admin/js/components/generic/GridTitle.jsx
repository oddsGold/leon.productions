import React from "react";
import {Link} from "react-router-dom";
import Search from "./Search";
import Filter from "./Filter";
import GridTitleButtons from "./GridTitleButtons";

export default function GridTitle({
    title, createLinkPath = null, otherButtons = null, searchValue = '', setSearchCallback = null, filters = []
}) {

    return (
        <div className="row mb-3 mt-4">
            <div className="col-8">
                <div className="h3 title">
                    {title}
                    <GridTitleButtons createLinkPath={createLinkPath} otherButtons={otherButtons} />
                </div>
            </div>
            <div className="col text-end">
                <div className="row justify-content-end">
                    {filters && filters.length > 0 && <div className="col-md-5">
                        {filters.map(filter => <Filter
                            title={filter.title}
                            current={filter.value}
                            options={filter.options}
                            setOption={filter.handler}
                        />)}
                    </div>}
                    {setSearchCallback && <div className="col-md-7">
                        <Search
                            value={searchValue}
                            setSearch={setSearchCallback}
                        />
                    </div>}
                </div>
            </div>
        </div>
    );
}
