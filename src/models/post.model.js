const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema({})

module.exports = mongoose.model("posts", postSchema)