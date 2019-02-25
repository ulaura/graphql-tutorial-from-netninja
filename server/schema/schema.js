const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

/*
  Three responsibilities of the schema right now.
  1. Define types
  2. Define relationsips between types.
  3. Define root queries
*/

// 1. Define a type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

// 2. Define relationships between root queries
// TBA. Right now we only have 1 type.

// 3. Describing a way a user can initially get into the graph
// to grab data with root queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        // code to get data from db or other source
      }
    }
  }
});

// exporting queries users are allowed to use on the front end
module.exports = new GraphQLSchema({
  query: RootQuery
});

