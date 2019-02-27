// book model for mongodb
// NOT the same schema as what's used for GraphQL

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

module.exports = mongoose.model("Book", bookSchema);