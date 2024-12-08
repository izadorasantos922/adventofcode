const fs = require("fs");

fs.readFile("input.txt", 'utf8', (err, data) => {
    if (err) {
        console.log("I can't read the file ", err);
        return;
    }

    let sum = 0;
    const array = data.split("\n"); 
    function matchResult(target, numbers, index = 0, current = numbers[0]) {
        if (index === numbers.length - 1) {
            return current === target ? 1 : 0;
        }

        return (
            matchResult(target, numbers, index + 1, current + numbers[index + 1]) ||
            matchResult(target, numbers, index + 1, current * numbers[index + 1])
        );
    }
    for (const item of array) {
        if (!item.trim()) continue;
        const cleanedItem = item.replace(/:/g, "");
        let newitems = cleanedItem.split(" ").map(Number);
        const result = newitems[0];
        const operationsNumbers = newitems.slice(1);
        sum += matchResult(result, operationsNumbers) ? result : 0;
    }

    console.log(sum);
});
