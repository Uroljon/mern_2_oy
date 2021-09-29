const fs = require("fs");
const path = require("path");

// fs.mkdir(path.join(__dirname, "new_folder"), (err)=>{ //yangi papka ochadi
//     if(err) throw new Error(err) //(masalan, papka mavjud bo'lsa) error qaytaradi
// })

// BU OVERRIDE QILADI
// fs.writeFile(path.join(__dirname, "new_folder", "fs.txt"), "text from writefile()", (er)=>{//agar fayl bolmasas, o'zi yaratvoladi
//     if(er){
//         throw new Error(er)
//     }else{
//         console.log("file has been created :)");
//     }
// })

// BU APPEND QILADI
// fs.appendFile("./new_folder/fs.txt", "\n from append file", (err)=>{}) //=>text from writefile()
//=> from append file   

// BU READ QILADI
// fs.readFile("./new_folder/fs.txt", {encoding : "utf-8"}, (err, data)=>{
//     if(!err){
//         // console.log(data); //<Buffer 74 65 78 74 20 66 72 6f 6d 20 77 72 69 74 65 66 69 6c 65 28 29>
//         // console.log(Buffer.from(data)); //<Buffer 74 65 78 74 20 66 72 6f 6d 20 77 72 69 74 65 66 69 6c 65 28 29>
//         // console.log(Buffer.from(data).toString()); //text from writefile()

//         // agar encoding yozilsa, Buffer kerak emas
//         console.log(data);
//     }
// })

// BU RENAME QILADI
// fs.rename("./new_folder_from_rename", path.join(__dirname, "new_folder"), (err)=>{})

// BU FAYLNI DELETE QILADI
// fs.unlink("./new_folder/remove.js", (err)=>{err ? console.log(err) : console.log("success")})

// BU DIRECTORY ni O'QIB , FAYLLARINI ARRAY QILIB QAYTARADI
fs.readdir(__dirname, (err, files)=>{
    if(!err) console.log(files);
})