import React, { ChangeEvent, useEffect, useState } from 'react';
import './SearchBar.css';

function SearchBar(props: { filterChange: (value: string) => void }) {
  const { filterChange } = props;
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const value = window.localStorage.getItem('inputValue') || '';
    setSearchValue(value);
    filterChange(searchValue);
  }, []);

  useEffect(() => {
    filterChange(searchValue);
    window.localStorage.setItem('inputValue', searchValue);
  }, [searchValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== searchValue) {
      setSearchValue(e.target.value);
    }
  };

  return (
    <div className="main">
      <h1 className="text-white mt-4 text-base">Cocktail Search</h1>
      <div className="search">
        <input
          className="search-input"
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default SearchBar;
