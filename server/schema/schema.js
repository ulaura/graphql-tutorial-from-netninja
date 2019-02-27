const graphql = require("graphql");
const _= require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

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
  4. Define a way to manipulate data (Mutations)
*/


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
        // return _.find(authors, {id: parent.authorId})
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
        // return _.filter(books, {authorId: parent.id})
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
        // return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        // code to get data from db or other source
        // return _.find(authors, {id: args.id});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){ // not using any arguments in this case...
        // return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){ // not using any arguments in this case...
        // return authors;
      }
    },
  }
});

// 4. Defining a way to manipulate data
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType, // AuthorType because we're trying to add an author
      args: {
        name: { type: GraphQLString },
        age:  { type: GraphQLInt }
        // we're not adding an id because MongoDB automatically
        // indexes data as it's entered into the database
      },
      resolve(parent, args) {
        // this Author is coming from the mongodb model
        let author = new Author({
          name: args.name,
          age:  args.age
        });
        // must return if we want to see data after
        // we make mutation query in a graphql GUI
        return author.save(); 
      }
    },
    addBook: {
      type: BookType,
      args: {
        name:     { type: GraphQLString },
        genre:    { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        // this Book is coming from the mongodb model
        let book = new Book({
          name:     args.name,
          genre:    args.genre,
          authorId: args.authorId
        });
        // must return if we want to see data after
        // we make mutation query in a graphql GUI
        return book.save();
      }
    }
  }
});

// exporting queries users are allowed to use on the front end
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

