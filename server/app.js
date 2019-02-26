const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

// middleware
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true 
}));

app.listen(4000, () => {
  console.log("Welcome to Port 4000. Now listening for request...");
});

