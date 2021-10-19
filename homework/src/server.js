const { PORT } = require("../config")
const fs = require("fs/promises")
const path = require("path")

const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

fs.readdir(path.join(__dirname, "routes")).then((files) => {
    files.forEach((file) => {
        const { endpoint, router } = require(path.join(__dirname, "routes", file))
        if (endpoint && router) app.use(endpoint, router)
    })
}).catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
})

