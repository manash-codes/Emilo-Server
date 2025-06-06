const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://picsum.photos/200/300?grayscale"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true })

module.exports = mongoose.model("posts", postSchema)