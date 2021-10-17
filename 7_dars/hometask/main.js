const http = require("http");
const fs = require("fs/promises");

const server = http.createServer(async (req, res) => {//server yaratish
    let url = req.url;
    let method = req.method;
    let homepage = await fs.readFile("./index.html", "utf-8")

    if (url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8" //charset kirill/arab xullas encoding uchun
        })
        res.write(homepage)
        res.end()
    }
    else if (url === "/users") {
        res.writeHead(200, {
            "Content-Type": "text/json"
        })
        let show_users = await fs.readFile("./users.json", "utf-8")
        // console.log(show_users, typeof (show_users));//shundog'am string qaytyapti ekan
        res.end(show_users)
    }
    else if (url === "/new_user") {
        if (method === "POST") {
            let username;
            let received = []
            req.on("data", (data) => { //post dan ma'lumotlar kelishini listen qiladi
                received.push(data)
                username = Buffer.from(data).toString().split("&")[0].split("=")[1]//this is username
            })
            let users_list = await fs.readFile("./users.json", "utf-8")
            users_list = JSON.parse(users_list)
            users_list.users.forEach((user) => {
                if (user.name === username) {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    })
                    res.write("<h2>Bunday user bor. Boshqa username kiriting :</h2>")
                    res.write(homepage)
                    res.end()
                } else {
                    set_new_user()
                }
            })
            function set_new_user() {
                let new_user = {}
                received = received.map(data => Buffer.from(data).toString())
                received = received[0].split("&")//2xil inputni split qiladi
                received.map((el) => {
                    let path = el.split("="); //key/value ni split qiladi
                    let key = path[0];
                    let value = path[1];
                    new_user[key] = value
                })
                users_list.users.push(new_user)
                fs.writeFile("./users.json", JSON.stringify(users_list))
                // console.log(users_list);
                res.end(JSON.stringify(new_user))
            }
        }
    }
})

server.listen("8080") //locallhostning 8080-portini tinglayapti


// ISHLADI :))))))))))))))))