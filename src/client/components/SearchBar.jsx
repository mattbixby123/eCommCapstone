import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SearchBar extends Component {
 render() {
    return (
      <form>
        <Field name="search" component="input" type="text" placeholder="Search..." />
      </form>
    );
 }
}

export default reduxForm({
 form: 'searchBar',
})(SearchBar);

