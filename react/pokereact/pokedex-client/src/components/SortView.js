import React from 'react';

const SortView = ({ visible = false, sortList = [], selectedSort = "", onSortChange }) => {
    return (
        <ul className={`dropdown-content ${visible ? 'd-block' : 'd-none'}`}>
            {sortList.map(sort =>
                <li key={sort} onClick={() => onSortChange(sort)} className={sort === selectedSort ? 'active' : ''}>
                    <span className="capitalize">{sort}</span>
                </li>
            )}
        </ul>
    );
};

export default SortView;