const fs = require("fs")
const path = require("path")

let name = process.argv[2].split("=");


fs.readFile(path.join(__dirname, "data.json"), { encoding: "utf-8" }, (err, data) => {
    if (!err) {
        let DATA = JSON.parse(data)
        DATA.users.forEach((user) => {
            if (user.name === name[1]) {
                throw new Error("bunday user bor")
            }
        })
        if(name[0] === "users"){
            console.log(DATA.users);
        }else{
            setUser(DATA)
        }
    }
})

function setUser(DATA) {  
    let next_user = {}
    for (let i = 2; i < process.argv.length; i++) {
        let key = process.argv[i].split("=")[0];
        let value = process.argv[i].split("=")[1];
        next_user[key] = value;
    }
    DATA.users.push(next_user);
    next_user = {}
    fs.writeFile("./data.json", JSON.stringify(DATA), (err)=>{err? console.log(err) : console.log("new user has been added")})
    console.log(DATA.users);
}


/***
data json

node name=asadbek age=19
node index.js users
{
    "users" : [
        {
            "name": "Asadbek",
            "age" : 19
        },
        {
            "name" : "Ism",
            "yosh" : 20
        }
    ]
}
*/