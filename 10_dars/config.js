// const dotenv = require("dotenv") //importing dotenv so that we can use .env files
// dotenv.config({path: path.join(__dirname, "..", ".env")}) //config function is a method of dotenv. We can indicate a path to .env files. If they are on the same directory, we don't need to include path. In our case, we need to include, because server.js is not on the same folder as .env file

// console.log(process.env); //shuni ichida .env ga yozilgan ma'lumotlar chiqadi



require("dotenv").config();//path keark emas, chunki .env bilan config.js bitta papaka ichida

module.exports = {
    PORT: process.env.PORT, //kerakli ma'lumotni export qilamiz
}