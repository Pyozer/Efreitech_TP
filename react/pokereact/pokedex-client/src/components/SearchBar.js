import React from 'react';

const SearchBar = ({ onSearch }) => (
    <div className="input-field">
        <input id="search" type="text" className="validate" onChange={(e) => onSearch(e.target.value)} />
        <label htmlFor="search">Search Pokemon</label>
    </div>
)

export default SearchBar;
