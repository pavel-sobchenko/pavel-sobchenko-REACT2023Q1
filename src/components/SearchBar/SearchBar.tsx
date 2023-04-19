import React, { ChangeEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addSearchValue } from '../../store';
import './SearchBar.css';

function SearchBar(props: { filterChange: () => void }) {
  const value = useAppSelector((state) => state.home.searchValue);
  const dispatch = useAppDispatch();
  const { filterChange } = props;

  useEffect(() => {
    const cacheValue = window.localStorage.getItem('inputValue') || '';
    if (cacheValue.length > 0) {
      dispatch(addSearchValue(cacheValue));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    dispatch(addSearchValue(val));
    window.localStorage.setItem('inputValue', val);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Enter') {
      filterChange();
    }
  };

  return (
    <div className="main">
      <h1 className="text-white mt-4 text-base">Cocktail Search</h1>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block search w-full pl-10 pr-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search a cocktail"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
      </div>
    </div>
  );
}

export default SearchBar;
