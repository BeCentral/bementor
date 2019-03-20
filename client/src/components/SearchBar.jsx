import React, {Component } from 'react';
import PropTypes from "prop-types";
import '../assets/css/search.css';

class SearchBar extends Component {

  propTypes = {
    onSearch: PropTypes.func.isRequired
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch(this.queryNode.value);
  };

  render() {
    return (
      <form className="app-search" onSubmit={this.handleSubmit}>
        <input ref={(node) => this.queryNode = node} name="query" type="text" placeholder="Search keyword"/>
        <input type="submit" value="Search"/>
      </form>
    );
  }
}

export default SearchBar;