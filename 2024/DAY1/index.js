const fs = require("fs")
let list1 = []
let list2 = []

fs.readFile('input.txt', 'utf8', (err, data) =>{
    if(err){
        console.error(err)
        return;
    }
    let lines = data.split("\n")
    lines.forEach(line => {
            let chuncks  = line.split(" ")
            let array = chuncks.filter((element) => element != '')
            list1.push(array[0])
            list2.push(array[1])
    });
    list1 = list1.map(Number).sort()
    list2 = list2.map(Number).sort()
    subtraction = 0

    if (list1.length !== list2.length) {
        console.error("Error: Lists have different lengths");
        return;
    }else{
        for(let i = 0; i < list1.length; i++){
            subtraction += Math.abs(list2[i] - list1[i])
        }
        let count = {}
        list1.forEach((num) =>{
            count[num] = list2.filter((item)=> item == num).length
        })
        count = Object.fromEntries(Object.entries(count).filter(([key, value])=> value > 0))
        const convertedObject = Object.fromEntries(Object.entries(count).map(([key, value]) => [Number(key), Number(value)]));
        sum = 0
        for(const item in convertedObject){
            sum += item * convertedObject[item]
        }
        console.log(sum)
    }
    
})

