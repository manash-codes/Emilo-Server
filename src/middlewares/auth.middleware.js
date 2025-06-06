const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../env");
const { BAD_REQUEST } = require("../config/httpCode");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(BAD_REQUEST).json({ message: "Token not provided!" })
        }

        const decoded = jwt.verify(token, JWT_SECRET)

        if (!decoded) {
            return res.status(BAD_REQUEST).json({ message: "Invalid token!" })
        }

        const user = await userModel.findById(decoded.userId)
        // console.log('user', user)

        if (!user) {
            return res.status(BAD_REQUEST).json({ message: "User not found!" })
        }

        req.user = user;
        next()
    } catch (error) {
        console.log('error', error.message)
        return res.status(500).json({ message: error.message })
    }
}

module.exports = authMiddleware;