const http = require("http")
const fs = require("fs/promises")

const server = http.createServer(async (req, res) => {
    let url = req.url;
    let method = req.method;

    if (url === "/" && method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        })
        let file = await fs.readFile("./index.html", "utf-8")
        res.end(file)
    } else if (url === "/" && method === "POST") {
        let new_user = {}

        req.on("data", (data) => {
            let received = Buffer.from(data).toString();
            received = received.split("&");
            received.forEach(element => {
                element = element.split("=")
                new_user[element[0]] = element[1]
            });
            // console.log(user);
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
                    "Cntent-Type": "text/json"
                })
                res.end(JSON.stringify({ ok: false, mesage: "User alredy exists" }))
            } else {
                res.writeHead(201, {//created degani
                    "Cntent-Type": "text/json; charset=utf-8"
                })
                users.push({
                    name: new_user.name,
                    phone: new_user.phone
                })
                fs.writeFile("./database.json", JSON.stringify({ users: users })) //yoki shunchaki {users}
                res.end(JSON.stringify({ ok: true, users }))
            }
        })
    }
})

server.listen(80)