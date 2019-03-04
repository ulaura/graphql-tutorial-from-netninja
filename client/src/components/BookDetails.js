import React, { Component } from 'react';
import { graphql } from "react-apollo"; // to bind GraphQL queries to a component
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {

  // creating a function to control what gets displayed
  displayBookDetails = () => {
    const { book } = this.props.data;

    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author: </p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>
            })}
          </ul>
        </div>
      )
    }
    return (
      <div>No book selected...</div>
    );
  }

  render() {
    return (
      <div id="book-details">
        <div>{this.displayBookDetails()}</div>
      </div>
    );
  }
}

// attaching props as a query variable here
export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails); 