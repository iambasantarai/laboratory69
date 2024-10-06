const fs = require("node:fs");

const fileContent = fs.readFileSync("./data.txt");
console.log("CONTENT AS BUFFER: ", fileContent);
console.log("ACTUAL CONTENT: ", fileContent.toString("utf-8"));
