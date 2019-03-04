import React, { Component } from 'react';
import { graphql } from "react-apollo"; // to bind GraphQL queries to a component
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected: null
    }
  }

  displayBooks(){
    let data = this.props.data;
    if(data.loading) {
      return <div>Loading books...</div>;
    }
    return data.books.map(book => {
      return(
        <li 
          key={book.id} 
          onClick={ e => {this.setState({ selected: book.id })}}
        >
          {book.name}
        </li>
      );
    })
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

// graphql(getBooksQuery)(BooksList) takes all the data
// from the graphQL query and stores it in BookList's props
export default graphql(getBooksQuery)(BookList);