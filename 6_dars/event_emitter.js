const Event_class = require("events");

class trigger extends Event_class{ //Event_class ni xususiyatlarini ishlata oladigan child class

    log(){
        this.emit("birnima", "optional Message from emitter.js")
    }
}

module.exports =  new trigger() //baribir classdan voris olishim kerak edi. Shuni boshida olib keyin export qisam import qiluvchilarga bir xil voris boradi. Va ular bir xil eventga javob beradi

