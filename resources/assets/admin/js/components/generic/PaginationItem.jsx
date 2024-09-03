import React from 'react';

export default function PaginationItem({page, setPage}){

    const setCurrentPage = () => {
        setPage(page);
    };

    return (
        <li onClick={setCurrentPage} >{page}</li>
    );
}
