import React from 'react';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../context/LocaleContext';

function SearchBar({ searchQuery, onSearchChange }) {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={
              locale === 'id' ? 'Cari Catatan...' : 'Search notes...'
            }
            className="p-2 border border-gray-300 rounded w-full mb-2 bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 shadow-inner	box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);"
          />
        );
      }}
    </LocaleConsumer>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
