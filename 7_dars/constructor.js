function Book(name, author, year) {  //bu Object constructor. (boshqa objectlarni yaratuvchi)
    this.name = name;
    this.year = year;
    this.author = author;
    this.getSum = _=>{
        return `${this.name} kitobi ${this.author} tomonidan ${this.year}-yilda chiqarilgan`
    }
}

let book_1 = new Book("Sherlock Holmes", "Agata", 1978)//bu Bookning instance i hisoblanadi

console.log(book_1);

/**SHUNI CLASS ORQALI KO'RINISHI
class Book {
    constructor(name, author, year) {
        this.name = name;
        this.year = year;
        this.author = author;
        this.getSum = _ => {
            return `${this.name} kitobi ${thi.author} tomonidan ${this.year}-yilda chiqarilgan`;
        };
    }
}*/