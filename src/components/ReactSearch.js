import React, { Component } from "react";
import SearchInput, { createFilter } from "react-search-input";

class ReactSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      searchField: this.props.searchField
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  render() {
    const KEYS_TO_FILTERS = [this.state.searchField];
    const filteredList = this.state.searchField.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {filteredList.map(i => {
          return <div className="mail" key={i} />;
        })}
      </div>
    );
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
}

export default ReactSearch;
