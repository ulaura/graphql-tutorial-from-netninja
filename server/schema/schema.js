const graphql = require("graphql");
const _= require("lodash");

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList 
} = graphql;

/*
  Three responsibilities of the schema right now.
  1. Define types
  2. Define relationsips between types.
  3. Define root queries
*/

// begin dummy data
// =================
const books = [
  { name: "Name of the Wind",     genre: "Fantasy",  id: "1", authorId: "1" },
  { name: "The Final Empire",     genre: "Fantasy",  id: "2", authorId: "2" },
  { name: "The Long Earth",       genre: "Sci-Fi",   id: "3", authorId: "3" },
  { name: "The Hero of Ages",     genre: "Fantasy",  id: "4", authorId: "2" },
  { name: "The Colour of Magic",  genre: "Fantasy",  id: "5", authorId: "3" },
  { name: "The Light Fantastic",  genre: "Fantasy",  id: "6", authorId: "3" },
];

const authors = [
  { name: "Patrick Rothfuss",  age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett",   age: 66, id: "3" },
];
// =================
// end dummy data


// 1. Define a type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id:     { type: GraphQLID },
    name:   { type: GraphQLString },
    genre:  { type: GraphQLString },
    author: { 
      type: AuthorType,  // just AuthorType because each book has only 1 author
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, {id: parent.authorId})
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id:   { type: GraphQLID },
    name: { type: GraphQLString },
    age:  { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType), // a GraphQL list of BookType since authors have more than one book
      resolve(parent, args){
        return _.filter(books, {authorId: parent.id})
      }
    }
  })
});

// 2. Define relationships between types.
// This is done by adding an authorId property to books,
// then adding an author property under fields() in BookType above.
// The author property uses a resolve function that passes in the
// parent array (books in this case) and the value of authorId,
// and then searches for the corresponding data in the authors array.

// To build a reciprocal relationship, a books property is added to Authortype.
// The books type is a GraphQLList since one author can have many books.
// The resolve function takes in the array books as the parent argument,
// and returns the books list with the authorId property 
// that matches the parent.id

// 3. Describing a way a user can initially get into the graph
// to grab data with root queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        // code to get data from db or other source
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        // code to get data from db or other source
        return _.find(authors, {id: args.id});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){ // not using any arguments in this case...
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){ // not using any arguments in this case...
        return authors;
      }
    },
  }
});

// exporting queries users are allowed to use on the front end
module.exports = new GraphQLSchema({
  query: RootQuery
});

