const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const password = require("./topsecret");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab databaase
mongoose.connect(`mongodb+srv://laura:${password}@graphql-tutorial-from-netninja-aglto.mongodb.net/test?retryWrites=true`);
mongoose.connection.once("open", () => {
  console.log("Connected to database!");
});

// middleware
app.use("/graphql", graphqlHTTP({
  schema, //graphql schema
  graphiql: true 
}));

app.listen(4000, () => {
  console.log("Welcome to Port 4000. Now listening for request...");
});

