const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();

// middleware
app.use("/graphql", graphqlHTTP({
  // leaving empty for now
}));

app.listen(4000, () => {
  console.log("Welcome to Port 4000. Now listening for request...");
});

