import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchInput, Button, TagInput, Pane, Checkbox, TextInputField, Label
} from 'evergreen-ui';

const Filters = ({ onFilter }) => {
  const [searchQuery, updateSearchState] = useState('');
  const updateSearch = e => updateSearchState(e.target.value);

  const filters = {
    search: searchQuery,
    mentor: true,
    mentee: true
  };

  const filter = () => onFilter(filters);

  const search = (e) => {
    e.preventDefault();
    filter();
  };

  return (
    <div className="connect__filters">
      <form onSubmit={search} className="connect__filters__search">
        <SearchInput onChange={updateSearch} name="search" placeholder="Search keywords" />
        <Button type="submit" onClick={search}>Search</Button>
      </form>
      <TextInputField
        label="Location"
        name="Location"
      />
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
  onFilter: PropTypes.func.isRequired
};

export default Filters;
