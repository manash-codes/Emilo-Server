const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../env");

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ $or: [{ email: email.toLowerCase() }, { username: email.toLowerCase() }] })

        if (!user) {
            console.log('User not found!')
            return res.status(401).json({ message: "User not found!" })
        }

        const isPasswordMatch = await bcrypt.compare(password, user?.password)

        if (!isPasswordMatch) {
            console.log('Password is incorrect!')
            return res.status(401).json({ message: "Password is incorrect!" })
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1d"
        })

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return res.status(200).json({ message: "Logged in successfully!", token })
    } catch (error) {
        console.log('error', error.message)
        return res.status(500).json({ message: error.message })
    }

}

async function register(req, res) {
    try {
        const { fullName, username, email, password } = req.body;
        const user = await userModel.findOne({ $or: [{ email }, { username }] })

        if (user?.email === email) {
            console.log('Email already exist!')
            return res.status(401).json({ message: "Email already exist!" })
        }

        if (user?.username === username) {
            console.log('Username is taken!')
            return res.status(401).json({ message: "Username is taken!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ fullName, username, email, password: hashedPassword })
        await newUser.save()

        // console.log('user', user)
        return res.status(200).json({ message: "User created successfully!" })
    } catch (error) {
        console.log('error', error.message)
        return res.status(500).json({ message: error.message })
    }
}

async function logout(req, res) {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        })
        return res.status(200).json({ message: "Logout successfully!" })
    } catch (error) {
        console.log('error', error.message)
        return res.status(500).json({ message: error.message })
    }
}


module.exports = {
    login,
    register,
    logout
}