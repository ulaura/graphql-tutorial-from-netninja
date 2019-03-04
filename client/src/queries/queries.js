import { gql } from "apollo-boost"; // to make GraphQL queries

const getBooksQuery = gql`
  query {
    books{
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  query {
    authors{
      name
      id
    }
  }
`

// mutation($variable) << allows variables to be passed to the mutation
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation };