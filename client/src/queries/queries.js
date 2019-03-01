import { gql } from "apollo-boost";     // to make GraphQL queries

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

export { getBooksQuery, getAuthorsQuery };