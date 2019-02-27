const graphql = require("graphql");
const _= require("lodash");

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt 
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
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth",   genre: "Sci-Fi",  id: "3", authorId: "3" },
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
      type: AuthorType,
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
  })
});

// 2. Define relationships between types.
// This is done by adding an authorId property to books,
// then adding an author property under fields() in BookType above.
// The author property uses a resolve function that passes in the
// parent array (books in this case) and the value of authorId,
// and then searches for the corresponding data in the authors array.

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
    }
  }
});

// exporting queries users are allowed to use on the front end
module.exports = new GraphQLSchema({
  query: RootQuery
});

