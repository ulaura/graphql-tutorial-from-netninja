import React, { Component } from 'react';
import { graphql } from "react-apollo"; // to bind GraphQL queries to a component
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from './BookDetails';

class BookList extends Component {
  displayBooks(){
    let data = this.props.data;
    if(data.loading) {
      return <div>Loading books...</div>;
    }
    return data.books.map(book => {
      return(
        <li key={book.id}>{book.name}</li>
      );
    })
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails />
      </div>
    );
  }
}

// graphql(getBooksQuery)(BooksList) takes all the data
// from the graphQL query and stores it in BookList's props
export default graphql(getBooksQuery)(BookList);