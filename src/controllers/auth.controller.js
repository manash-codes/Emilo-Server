const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../env");
const { NOT_FOUND, OK, SERVER_ERROR, CREATED } = require("../config/httpCode");

async function login(req, res) {
    try {
        const { email, password } = req.validated;
        const user = await userModel.findOne({ $or: [{ email: email.toLowerCase() }, { username: email.toLowerCase() }] })

        if (!user) {
            console.log('User not found!')
            return res.status(NOT_FOUND).json({ message: "User not found!" })
        }

        const isPasswordMatch = await bcrypt.compare(password, user?.password)

        if (!isPasswordMatch) {
            console.log('Password is incorrect!')
            return res.status(OK).json({ message: "Password is incorrect!" })
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1d"
        })

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return res.status(OK).json({ message: "Logged in successfully!", token })
    } catch (error) {
        console.log('error', error.message)
        return res.status(SERVER_ERROR).json({ message: error.message })
    }

}

async function register(req, res) {
    try {
        const { fullName, username, email, password } = req.validated;
        const user = await userModel.findOne({ $or: [{ email }, { username }] })

        if (user?.email === email) {
            console.log('Email already exist!')
            return res.status(OK).json({ message: "Email already exist!" })
        }

        if (user?.username === username) {
            console.log('Username is taken!')
            return res.status(OK).json({ message: "Username is taken!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ fullName, username, email, password: hashedPassword })
        await newUser.save()

        // console.log('user', user)
        return res.status(CREATED).json({ message: "User created successfully!" })
    } catch (error) {
        console.log('error', error.message)
        return res.status(SERVER_ERROR).json({ message: error.message })
    }
}

async function logout(req, res) {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        })
        return res.status(OK).json({ message: "Logout successfully!" })
    } catch (error) {
        console.log('error', error.message)
        return res.status(SERVER_ERROR).json({ message: error.message })
    }
}


module.exports = {
    login,
    register,
    logout
}