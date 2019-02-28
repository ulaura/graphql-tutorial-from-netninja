import React, { Component } from 'react';
import { gql } from "apollo-boost";     // to make GraphQL queries
import { graphql } from "react-apollo"; // to bind GraphQL queries to a component

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

class BookList extends Component {
  render() {
    console.log("PROPS: ", this.props);
    return (
      <div>
        <ul id="book-list">
          <li>Book Name</li>
        </ul>
      </div>
    );
  }
}

// graphql(getBooksQuery)(BooksList) takes all the data
// from the graphQL query and stores it in BookList's props
export default graphql(getBooksQuery)(BookList);