const Fs = require("fs/promises"); //require("fs").promises
const { type } = require("os");
const Path = require("path")

async function read_file(path) {  
    let data = await Fs.readFile(path, "utf-8", (err, user)=>{ //utf-8 encodingni shunday yozsa bo'ladi
        // if(err){
        //     console.log(err);
        // }
    })
    // console.log(data, 1, typeof(data)); //=> string
    data = await JSON.parse(data) //=> JSON.parse is sync, and doesn't return promise. We could omit "await"
    // console.log(data, 2, typeof(data)); //=> object
    return data
}

read_file(Path.join(__dirname, "data.json")).then((data)=>{
    console.log(data, "final", typeof(data));
})