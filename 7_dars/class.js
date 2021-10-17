class Book {
    constructor(name, author, year) {
        this.name = name;
        this.year = year;
        this.author = author;
        this.getSum = function() { //bu instance ning odatiy methodi
            return `${this.name} kitobi ${this.author} tomonidan ${this.year}-yilda chiqarilgan`;
        };
    }

    global_func(){ //bu instance ning prototype iga kirib ketadi
        console.log("Global func is 100% accessable");
        this.#private_func() //buni faqat shunaqa qilib ishlatsa bo'ladi
    }
    static static_func(){ //instance ga umuman aloqasi yo'q
        console.log("Static func ga Book class orqaligina ulanish mumkin");
    }
    #private_func(){
        console.log("Private func is only available inside Book class");
    }
}

let instance = new Book("Coco", "Will Smith", 2021)

instance.global_func()
Book.static_func()
// instance.static_func() //this is not accessable via instance
console.log(instance);