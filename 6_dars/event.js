// const Event_class = require("events"); //bu kerak emas. Chunki import qigan faylimda bor
// let emitter = new Event_class() //bu ham kk emas. Chunki import qigan faylimdan voris olib jonatilgan
let emitter = require("./event_emitter")

// QOIDA !!! listener function emitter functiondan oldin turishi kk!!!
emitter.on("birnima", (message, message2, mesage3)=>{//event ni eshitib turish uchun 
    if(typeof(message) === "string"){
        // console.log(message, " : birnima event is triggered" );//=>optional Message to listener  : birnima event is triggered
        console.log(message, message2);//=> salom xayr

    }else{
        console.log(message.text, message.num);//=> optional Message to listener 16
    }
})//=>listen "birnima" and invoke callback when event is triggered

//event ni uyg'otish uchun
// emitter.emit("birnima", "optional Message to listener")  //=> invoke/emit "birnima" event and send message string

// emitter.emit("birnima", {
//     text : "optional Message to listener",
//     num : 16
// })  //=> invoke/emit "birnima" event and send data

// emitter.emit("birnima", "salom", "xayr") //> send multiple data

emitter.log() //bu import qigan faylimni emitter funksiyasini chaqirish uchun