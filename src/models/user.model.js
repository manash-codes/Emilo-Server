const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({})

module.exports = mongoose.model("users", userSchema)