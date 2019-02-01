import React, { Component } from 'react';
// import SearchResult from './SearchResult';


class Search extends Component {
  // constructor(){
  //   super();
  //   this.state = {

  //   }
  // }
  render() {
    return (
      <button onClick={() => { this.props.toggleSearch() }}>Click me</button>
    )
    }

      
}

export default Search;