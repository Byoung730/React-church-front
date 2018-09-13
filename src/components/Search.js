import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theItems: null,
      query: "",
      results: []
    };
  }

  myCallback = props => {
    this.setState({ theItems: this.props.allItems });
  };

  getInfo = () => {};

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
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
