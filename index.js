const connectDB = require("./database");
const { PORT } = require("./env")
const app = require("./src/app")

const port = PORT || 3000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log('App is running on port:', PORT)
    })
}).catch((err) => {
    console.log("Error:", err.message)
    process.exit(1)
})