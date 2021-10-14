const { PORT } = require("../config")
const path = require("path")
const fs = require("fs").promises
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded()) //{extended: true}
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

// EJS setting (after it's been installed. No need to require it)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    if (req.cookies.current_user) {
        res.status(301).redirect("/chat")
    } else {
        res.status(200).render("login", {
            ok: true,
            message: "Welcome to Blabbergram :)"
        })
    }
})

app.post("/", async (req, res) => {
    let newUser = req.body.user_name;
    // check database for existance of new user_name
    let database = await fs.readFile(path.join(__dirname, "database.json"), "utf-8")
    database = JSON.parse(database)
    let userID = database.users[database.users.length - 1].user_id;
    let is_free = database.users.filter((user) => user.user_name === newUser).length;

    if (is_free) {
        res.status(409).render("login", {
            ok: false,
            message: "User already exists. Try to use another name"
        })
    } else {
        res.cookie("current_user", newUser, { maxAge: 100 * 1000 * 60 * 60 * 24 }) //set cookie that expires in 100 days
        // write to databse
        database.users.push({
            "user_id": ++userID,
            "user_name": `${newUser}`
        })
        await fs.writeFile(path.join(__dirname, "database.json"), JSON.stringify(database))
        res.status(301).redirect("/chat")
    }
})

app.get("/chat", async (req, res) => {
    if (req.cookies.current_user) {//agar cookie bo'lsa
        let database = await fs.readFile(path.join(__dirname, "database.json"), "utf-8")
        database = JSON.parse(database)
        res.status(200).render("chat", { users: database.users, messages: database.messages, in_cookie: req.cookies.current_user })
    } else {
        res.status(403).render("login", {
            ok: false,
            message: "You don't have a permission to see chats. Login first :|"
        })
    }
})
app.post("/chat", async (req, res) => {
    // set messages
    if (req.cookies.current_user) {//agar cookie bo'lsa
        let new_message = req.body.message;
        let sender = req.cookies.current_user;
        let database = await fs.readFile(path.join(__dirname, "database.json"), "utf-8")
        database = JSON.parse(database)
        database.messages.push({
            "user_name": sender,
            "message_id": database.messages.length,
            "message": new_message
        })
        await fs.writeFile(path.join(__dirname, "database.json"), JSON.stringify(database))
        res.status(200).render("chat", { users: database.users, messages: database.messages, in_cookie: req.cookies.current_user })
    } else {
        res.status(403).render("login", {
            ok: false,
            message: "You don't have a permission to see chats. Login first :|"
        })
    }
})

app.listen(PORT, () => console.log(`server started at PORT => ${PORT}`))