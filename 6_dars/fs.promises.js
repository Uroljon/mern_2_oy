const Fs = require("fs")

async function read_file(path) {  
    let response = await Fs.readFile(path, "utf-8", (err, data)=>{ //utf-8 encodingni shunday yozsa bo'ladi
        if(err){
            // throw new Error(err)
        }
    })
    response = await JSON.parse(response)
    return response
}

read_file("./data.json").then((data)=>{
    console.log(data);
})