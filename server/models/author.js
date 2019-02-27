// author model for mongodb
// NOT the same schema as what's used for GraphQL

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model("Author", authorSchema);