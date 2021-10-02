const http = require("http")
const fs = require("fs/promises")

const server = http.createServer(async (req, res) => {
    let url = req.url;
    let method = req.method;

    if (url === "/" && method === "GET") {//send registration page
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        })
        let file = await fs.readFile("./index.html", "utf-8")
        res.end(file)
    } else if (url === "/" && method === "POST") {//register new user
        let new_user = {}

        req.on("data", (data) => {
            let received = Buffer.from(data).toString();
            received = received.split("&");
            received.forEach(element => {
                element = element.split("=")
                new_user[element[0]] = element[1]
            });
        })
        req.on("end", async () => {
            let db = await fs.readFile("./database.json", "utf-8");//string qaytadi
            db = await JSON.parse(db) //json ga o'girdik
            let users = db.users;
            let is_user_exist = users.find((user) => {
                return user.name.toLowerCase() === new_user.name.toLowerCase()
            })
            if (is_user_exist) {
                //err
                res.writeHead(404, {//error degani
                    "Content-Type": "text/json"
                })
                res.end(JSON.stringify({ ok: false, mesage: "User alredy exists" }))
            } else {
                users.push({
                    name: new_user.name,
                    phone: new_user.phone
                })
                res.writeHead(301, {//created degani
                    "Set-Cookie": `name=${new_user.name}`,
                    "Location": "/chat",
                    "Content-Type": "text/json; charset=utf-8"
                })
                fs.writeFile("./database.json", JSON.stringify({ users: users })) //yoki shunchaki {users}
                res.end(JSON.stringify({ ok: true, users }))
            }
        })
    } else if (url === "/chat" && method === "GET") {//send chat.html
        res.writeHead(201, {//created degani
            "Content-Type": "text/html; charset=utf-8"
        })
        let chat_to_show = await fs.readFile("./chat.html", "utf-8")
        res.end(chat_to_show)//initial render

    } else if (url === "/chat_data" && method === "GET") {//send data to front-end for rendering

        let registered_users = await fs.readFile("./database.json", "utf-8")
        registered_users = JSON.parse(registered_users).users; //these are all users
        let me = req.headers.cookie.split("=")[1]; //this is current user

        let messages = await fs.readFile("./chat.json", "utf-8")
        messages = JSON.parse(messages).messages; //these are all users

        let all_data = { ok: true, current_user: me, users: registered_users, messages: messages }
        res.end(JSON.stringify(all_data))

    } else if (url === "/chat" && method === "POST") { //set new message and its sender
        let new_message = {};
        res.writeHead(301, {
            "Location": "/chat",
            "Content-Type": "text-json; charset=utf-8"
        })
        req.on("data", (data) => {
            data = Buffer.from(data).toString();
            new_message[data.split("=")[0]] = data.split("=")[1]
        })
        req.on("end", async () => {
            let username = req.headers.cookie.split("=")[1];
            new_message.username = username;
            let chat = await fs.readFile("./chat.json", "utf-8")
            chat = JSON.parse(chat)
            chat.messages.push(new_message)
            await fs.writeFile("./chat.json", JSON.stringify(chat))
        })
        res.end(JSON.stringify({ok: true}))

    } else if (url === "/chat_front.js" && method === "GET") { //send js file
        res.writeHead(200, {
            "Content-Type": "application/javascript; charset=utf-8"
        })
        let front = await fs.readFile("./chat_front.js", "utf-8")
        res.end(front)//initial render
    }
})

server.listen(80)



/**
     // let cookies = req.headers.cookie;
                // console.log(cookies);

        // else if (url === "/last_message" && method === "GET") {
    //     console.log("las message requested");
    //     res.writeHead(200, {
    //         "Content-Type": "text-json; charset=utf-8"
    //     })
    //     let chats = await fs.readFile("./chat.json", "utf-8")
    //     chats = JSON.parse(chats);

    //     res.end(JSON.stringify(chats.messages[chats.messages.length - 1]))

    // } 
*/