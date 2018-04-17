const mongoose = require("mongoose");
const schema = mongoose.Schema;

var Movie = new schema({
    name: String,
    poster: String,
    rate: String
});

module.exports = mongoose.model("movie", Movie);