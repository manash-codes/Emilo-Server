const { PORT } = require("./env")
const app = require("./src/app")

const port = PORT || 3000;

app.listen(port, () => {
    console.log('App is running on port: ', PORT)
})