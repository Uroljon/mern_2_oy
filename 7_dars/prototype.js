function Book(name, author, year) { 
    this.name = name;
    this.year = year;
    this.author = author;
}
// Bu getSum ni yashirib qo'yyapti. 
Book.prototype.getSum =  function(){//faqat this ishlashi uchun funksiya arrow_function bo'lmasligi kerak
    return `${this.name} kitobi ${this.author} tomonidan ${this.year}-yilda chiqarilgan`
}

let book_1 = new Book("Sherlock Holmes", "Agata", 1978)

console.log(book_1.getSum());

