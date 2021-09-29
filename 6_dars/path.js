let path = require("path");

// bu faqat basenameni qaytaradi (USELESS)
console.log(path.basename("C:\\temp\\select.html")); //=> select.html
console.log(path.basename("C:\\temp\\select.html", ".html")); //=> select

//__dirname, __filename global obyektlar:
console.log(__dirname); // => D:\O'roljon\IMPORTANT\PROJECTS\fulfill edu MERN\mern_2_oy\6_dars
// ubuntuda pwd degan kod terminada __dirname ga o'xshab papkagacha bolgan path qaytaradi
console.log(__filename); // => D:\O'roljon\IMPORTANT\PROJECTS\fulfill edu MERN\mern_2_oy\6_dars\path.js

// funksiya sifatida ishlatilishi
console.log(path.basename(__dirname)); // => 6_dars
console.log(path.dirname("C:\\temp\\select.html")); // => C:\temp
console.log(path.extname("C:\\temp\\select.html")); // => .html  //extension ni oberadi

console.log((path.parse(__filename))); /* =>
    {
        root: 'D:\\',
        dir: "D:\\O'roljon\\IMPORTANT\\PROJECTS\\fulfill edu MERN\\mern_2_oy\\6_dars",
        base: 'path.js',
        ext: '.js',
        name: 'path'
    }
*/
// bu yangi fayl uchun path qiberadi. (COMMONLY USED)
console.log(path.join(__dirname, "yangi_fayl.js")); // => D:\O'roljon\IMPORTANT\PROJECTS\fulfill edu MERN\mern_2_oy\6_dars\yangi_fayl.js
// yaxshi tomoni tashqari papkaga o'tib path yasash oson:
console.log(path.join(__dirname, "..", "yangi_fayl.js")); // => D:\O'roljon\IMPORTANT\PROJECTS\fulfill edu MERN\mern_2_oy\yangi_fayl.js  // ".." === "../"