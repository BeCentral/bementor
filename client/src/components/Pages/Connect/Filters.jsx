import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchInput, Button } from 'evergreen-ui';

const Filters = ({ onFilter }) => {
  const [searchQuery, updateSearchState] = useState('');
  const updateSearch = e => updateSearchState(e.target.value);

  const filters = {
    search: searchQuery
  };

  const filter = () => onFilter(filters);

  const search = (e) => {
    e.preventDefault();
    filter();
  };

  return (
    <div>
      <form onSubmit={search}>
        <SearchInput onChange={updateSearch} name="search" placeholder="Search keywords" />
        <Button type="submit" onClick={search}>Search</Button>
      </form>
    </div>
  );
};

Filters.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default Filters;
