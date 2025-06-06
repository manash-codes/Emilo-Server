const { NOT_FOUND, OK, SERVER_ERROR } = require("../config/httpCode");
const postModel = require("../models/post.model");

async function get(req, res) {
    try {
        const { _id } = req.user;
        const limit = req.query.limit || 10;
        const posts = await postModel.find({ author: _id }).limit(limit)

        if (!posts) {
            return res.status(NOT_FOUND).json({ message: "Posts not found!" })
        }

        return res.status(OK).json({ message: "Posts fetched successfully!", posts })
    } catch (error) {
        console.log('error', error.message)
        return res.status(SERVER_ERROR).json({ message: error.message })
    }
}

async function getById(req, res) {
    try {
        const { _id } = req.user;
        const postId = req.params.id;
        const post = await postModel.findById({ author: _id, _id: postId })

        if (!post) {
            return res.status(NOT_FOUND).json({ message: "Post not found!" })
        }

        return res.status(OK).json({ message: "Post fetched successfully!", post })
    } catch (error) {
        console.log('error', error.message)
        return res.status(SERVER_ERROR).json({ message: error.message })
    }
}

async function create(req, res) {
    try {
        const { _id } = req.user;
        const { title, description } = req.body;
        const post = new postModel({ title, description, author: _id })
        await post.save()
        return res.status(OK).json({ message: "Post created successfully!" })
    } catch (error) {
        console.log('error', error.message)
        return res.status(SERVER_ERROR).json({ message: error.message })
    }
}

async function update(req, res) {
    try {
        const { _id } = req.user;
        const postId = req.params.id;
        const { title, description } = req.body;
        await postModel.updateOne({ title, description }, { author: _id, _id: postId })
        return res.status(OK).json({ message: "Post updated successfully!" })
    } catch (error) {
        console.log('error', error.message)
        return res.status(SERVER_ERROR).json({ message: error.message })
    }
}

async function remove(req, res) {
    try {
        const { _id } = req.user;
        const postId = req.params.id
        await postModel.deleteOne({ author: _id, _id: postId })
        return res.status(OK).json({ message: "Post removed successfully!" })
    } catch (error) {
        console.log('error', error.message)
        return res.status(SERVER_ERROR).json({ message: error.message })
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove
}