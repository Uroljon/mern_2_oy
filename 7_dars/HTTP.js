//HTTP object is used to create a server
const http = require("http");
const fs = require("fs/promises");
// const path = require("path");

const server = http.createServer(async (req, res) => {//server yaratish
    let url = req.url;
    let method = req.method;

    if (url === "/home") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8" //charset kirill/arab xullas encoding uchun
        })
        // res.write("salom")//buni yozsak ham html ga yozadi
        res.end("<h1>Salom, салом</h1>")
    }
    else if (url === "/about") {
        res.writeHead(200, {
            "Content-Type": "text/json"
        })
        res.end("{name : Uroljon}")
    }
    else if (url === "/sign") {
        if (method === "GET") {
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8" //charset kirill/arab xullas encoding uchun
            })
            let html = await fs.readFile("./test.html", "utf-8")
            res.write(html)
            res.end()
        } else if (method === "POST") {

            let received = []
            req.on("data", (data) => { //post dan ma'lumotlar kelishini listen qiladi
                received.push(data)
            })
            req.on("end", () => {
                received = received.map(data => Buffer.from(data).toString())
                received = received[0].split("&")//2xil inputni split qiladi
                let all_obj = {}
                received.map((el) => {
                    let path = el.split("="); //key/value ni split qiladi
                    let key = path[0];
                    let value = path[1];
                    all_obj[key] = value
                })
                console.log(all_obj);
                res.end(JSON.stringify(all_obj))
            })
        }
    }

    console.log(url, method);
})

server.listen("8080") //locallhostning 8080-portini tinglayapti