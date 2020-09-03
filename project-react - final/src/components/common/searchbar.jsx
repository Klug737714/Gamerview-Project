import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    search: "",
    posts: [],
  };
  handleChange(e) {
    this.setState({ search: e.target.value });
  }
  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          name="search"
          id="search"
          className="form-control"
          onChange={this.handleChange.bind(this)}
        />
        <button onClick={this.onClick} type="submit" className="btn">
          <i className="fas fa-search"></i>
        </button>
      </React.Fragment>
    );
  }
}

export default SearchBar;
