const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    data = data.replace(/[\r\n\t]+/g, '');
    let enable = true
    sum = 0
    const regex = /mul\s*\(\s*\d+\s*,\s*\d+\s*\)|do\(\)|don['"]t\(\)/g;
    
    const operations = data.match(regex)
    operations.forEach(operation =>{
        if(operation.startsWith("do()")){
            enable = true
        }else if(operation.startsWith("don't()") || operation.startsWith("don’t()")){
            enable = false
        }else if(enable && operation.startsWith("mul")){
            const [a, b] = operation.match(/\d+/g).map(Number);
            sum += a * b
        }
    })
    console.log(sum)
});
// 88811886