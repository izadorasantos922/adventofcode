
const fs = require("fs");
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let countSafe = 0
    let lines = data.split("\n")
    function isSafe(array){
        let increasing = null
        for(let i = 0; i < array.length - 1; i++){
            let subtraction = array[i + 1] - array[i]
            if(Math.abs(subtraction) < 1 || Math.abs(subtraction) > 3){
                return false
            }
            if(increasing==null){
                increasing = subtraction > 0
            }else if((increasing && subtraction < 0) || (!increasing && subtraction > 0)){
                return false
            }
        }
        return true
    }

    lines.forEach((line) =>{
        let chunks = line.split(" ")
        let newArray = chunks.map(Number)

        if(isSafe(newArray)){
            countSafe++
            return;
        }
        let dampner = false
        for(let i = 0; i < newArray.length; i++){
            let modifiedArray = [...newArray]
            modifiedArray.splice(i, 1)
            if(isSafe(modifiedArray)){
                dampner = true;
                break
            }
        }
        if(dampner){
            countSafe++
        }
    })
    console.log(countSafe); 
});
