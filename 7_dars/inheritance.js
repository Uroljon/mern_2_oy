function Book(name, author, year) { 
    this.name = name;
    this.year = year;
    this.author = author;
}
function Magazine(name, author, year) { 
    this.name = name;
    this.year = year;
    this.author = author;
}

Book.prototype.getSum =  function(){
    return `${this.name} kitobi ${this.author} tomonidan ${this.year}-yilda chiqarilgan`
}

// shu yerda Magazine Bookning vorisi bolyaptimush
Magazine.prototype = Object.create(Book.prototype)
let mag_1 = new Book("Kali", "hacker", 2021)
// console.log(mag_1.getSum());

// ANIQROG'I OBJ.CREATE(Eski_obj) eski object prop, method larini yangi Objectga ko'chirib beradi. Faqat argumentiga object oladi contructor emas.
let me = Object.create(mag_1)
// me.name = "HEHE" //inherited properties can be overwritten
me.familiya = "Khidirboev" //"familiya" is a property set on "me", but not on "mag_1"
// console.log(me.getSum()); //prototypeni Bookdan ogandi
console.log(me.familiya); 


