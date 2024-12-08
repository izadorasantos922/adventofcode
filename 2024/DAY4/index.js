const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Convert input data into a 2D grid
    let grid = data.split('\n').map(row => row.split(''));
    const word = "XMAS";
    const wordLength = word.length;
    let count = 0;

    // Define the directions (row delta, column delta)
    const directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1],  // right
        [-1, -1], // up-left
        [-1, 1],  // up-right
        [1, -1], // down-left
        [1, 1],  // down-right
    ];

    // Function to check if the word "XMAS" appears starting at (r, c) in a certain direction
    function checkDirection(r, c, dr, dc) {
        for (let i = 0; i < wordLength; i++) {
            const nr = r + i * dr;
            const nc = c + i * dc;
            // Check if out of bounds or the letter doesn't match
            if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length || grid[nr][nc] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    // Loop through every cell in the grid
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            // Check all 8 directions
            for (let [dr, dc] of directions) {
                if (checkDirection(r, c, dr, dc)) {
                    count++; // If "XMAS" is found, increment the count
                }
            }
        }
    }

    // Print the result
    console.log(`The word "XMAS" appears ${count} times.`);
});
