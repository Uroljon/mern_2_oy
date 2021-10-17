class Book {
    constructor(name, author, year) {
        this.name = name;
        this.year = year;
        this.author = author;
        this.getSum = function() { 
            return `${this.name} kitobi ${this.author} tomonidan ${this.year}-yilda chiqarilgan`;
        };
    }
    global_func(){ 
        console.log("Global func is 100% accessable");
        this.#private_func() //buni faqat shunaqa qilib ishlatsa bo'ladi
    }
    static static_func(){ 
        console.log("Static func ga Book class orqaligina ulanish mumkin");
    }
    #private_func(){
        console.log("Private func is only available inside Book class");
    }
}

class Magazine extends Book {//bu Book classining sub-class i
    constructor (name, author, year){
        super(name, author, year) // shu narsa Book classdan voris olinish uchun ishlatildi
    }
}
let instance = new Magazine("Coco", "Will Smith", 2021)
console.log(instance.getSum());
instance.global_func()
Magazine.static_func() //demak statik funksiyaga voris funksiyadan ulanish mumkin ekan