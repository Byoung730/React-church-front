import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theItems: null,
      query: "",
      searchField: this.props.searchField
    };
  }

  getInfo = () => {
    // let matches = [];
    // console.log("searchField (props): ", this.props.searchField);
    // console.log("searchField (state): ", this.state.searchField);
    // if (this.state.searchField) {
    // matches = this.state.searchField.map(i =>
    //   this.state.searchField.contains(searchValue)
    // }
    // );
  };

  // getInfo = () => {};

  handleInputChange = () => {
    const field = this.state.searchField;
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo(this.state.query);
          }
        }
        if (this.state.query) {
          return field.filter(i => i.contains(this.state.query));
        }
      }
    );
  };

  render() {
    return (
      <form>
        <input
          placeholder="Search"
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <p>Searching for {this.state.query}...</p>
      </form>
    );
  }
}

export default Search;
