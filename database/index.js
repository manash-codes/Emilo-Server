const { connect } = require('mongoose')
const { MONGO_URI } = require('../env')
async function connectDB() {
    try {
        await connect(MONGO_URI)
        console.log("Database connected...!")
    } catch (error) {
        console.log('error: ', error.message)
    }
}

module.exports = connectDB;