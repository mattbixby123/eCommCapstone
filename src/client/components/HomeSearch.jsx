import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../redux/actions';

class HomeSearch extends Component {
 state = {
    search: '',
    results: [],
 };

 handleChange = (e) => {
    const search = e.target.value;
    this.setState({ search });
    this.props.updateSearchQuery(search);
    console.log(search);
 };

 handleQueryResultClick = (e) => {
    const searchResultName = e.target.id;
    this.setState({
      search: searchResultName,
      results: [],
    });
 };

 render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        {/* Render results here */}
      </div>
    );
 }
}

const mapDispatchToProps = (dispatch) => ({
 updateSearchQuery: (query) => dispatch(updateSearchQuery(query)),
});

export default connect(null, mapDispatchToProps)(HomeSearch);