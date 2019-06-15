import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SearchInput, Button, TagInput, Pane, Checkbox, TextInputField, Label
} from 'evergreen-ui';

const Filters = ({ onFilter, fixed }) => {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    mentor: true,
    mentee: true,
    interests: []
  });

  let $search;
  let $location;

  useEffect(() => {
    onFilter(filters);
  }, [filters]);

  const filterBySearchQuery = async (e) => {
    e.preventDefault();
    setFilters({ ...filters, search: $search.value });
  };

  const filterByLocation = (e) => {
    e.preventDefault();
    setFilters({ ...filters, location: $location.value });
  };

  return (
    <div className={`connect__filters ${fixed ? 'connect__filters--scroll' : ''}`}>
      <h3>Filter results</h3>
      <form onSubmit={filterBySearchQuery} className="connect__filters__search">
        <SearchInput innerRef={(n) => { $search = n; }} name="search" placeholder="Search keywords" />
        <Button type="submit">Search</Button>
      </form>
      <form onSubmit={filterByLocation} className="connect__filters__location">
        <TextInputField innerRef={(n) => { $location = n; }} name="location" label="Location" />
        <Button type="submit">Update</Button>
      </form>
      <Pane className="connect__filters__group">
        <Label>Filter by interests</Label>
        <TagInput width="100%" inputProps={{ placeholder: 'press ENTER to add an interest' }} />
      </Pane>

      <Pane className="connect__filters__group">
        <Label>Types</Label>
        <Checkbox label="Mentors" checked name="mentor" />
        <Checkbox label="Mentees" checked name="mentee" />
      </Pane>
    </div>
  );
};

Filters.propTypes = {
  onFilter: PropTypes.func.isRequired,
  fixed: PropTypes.bool.isRequired
};

export default Filters;
