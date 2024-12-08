const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const chunks = data.split("\n\n");
    if (chunks.length < 2) {
        console.error("Invalid input format");
        return;
    }

    const ordering = new Set(chunks[0].split("\n").map(line => line.trim()));

    const comparer = (p1, p2) => {
        if (ordering.has(`${p1}|${p2}`)) return -1;
        if (ordering.has(`${p2}|${p1}`)) return 1;
        return 0;
    };

    const updates = chunks[1]
        .split("\n")
        .filter(line => line.trim() !== "")
        .map(line => line.split(",").map(item => item.trim()));

    function getMiddle(pages) {
        const middleIndex = Math.floor(pages.length / 2);
        const middleValue = pages[middleIndex];
        const parsedValue = parseInt(middleValue, 10);
        if (isNaN(parsedValue)) {
            console.error(`Invalid number: "${middleValue}"`);
            return 0;
        }
        return parsedValue;
    }

    function isSorted(pages, comparer) {
        const sortedPages = [...pages].sort(comparer);
        return pages.join(",") === sortedPages.join(",");
    }

    function sumSortedUpdates(updates, comparer) {
        return updates
            .filter(pages => isSorted(pages, comparer))
            .reduce((sum, pages) => sum + getMiddle(pages), 0);
    }

    function sumUnsortedUpdates(updates, comparer) {
        return updates
            .filter(pages => !isSorted(pages, comparer))
            .map(pages => [...pages].sort(comparer))
            .reduce((sum, pages) => sum + getMiddle(pages), 0);
    }

    const resultOne = sumSortedUpdates(updates, comparer);
    const resultTwo = sumUnsortedUpdates(updates, comparer);
});
