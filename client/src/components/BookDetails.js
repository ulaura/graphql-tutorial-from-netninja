import React, { Component } from 'react';
import { graphql } from "react-apollo"; // to bind GraphQL queries to a component
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {

  render() {
    return (
      <div id="book-details">
        <p>Output book details here...</p>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookDetails); 