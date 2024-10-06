// const fs = require("node:fs");

// const fileContent = fs.readFileSync("./data.txt");
// console.log("CONTENT AS BUFFER: ", fileContent);
// console.log("ACTUAL CONTENT: ", fileContent.toString("utf-8"));

// Promise API
// const fs = require("node:fs/promises");
// (async () => {
//   try {
//     await fs.copyFile("./data.txt", "./copied-promise.txt");
//   } catch (error) {
//     console.log("ERROR: ", error);
//   }
// })();

// Callback API
// const fs = require("node:fs");
//
// fs.copyFile("./data.txt", "./copied-callback.txt", (error) => {
//   if (error) console.log("ERROR: ", error);

// Synchronous API
const fs = require("node:fs");

fs.copyFileSync("./data.txt", "./copied-synchronous.txt");
