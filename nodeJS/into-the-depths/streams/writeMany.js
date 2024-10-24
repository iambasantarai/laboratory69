// execution time: 684.954ms
// CPU usage: 100% (single core)
// const fs = require("node:fs/promises");
// (async () => {
//   const fileHandle = await fs.open("./test.txt", "w");
//
//   console.time("writeMany");
//   for (let i = 0; i < 100000; i++) {
//     fileHandle.write(`${i} `);
//   }
//   console.timeEnd("writeMany");
// })();

// execution time: 92.819ms
// const fs = require("node:fs");
// (async () => {
//   console.time("writeMany");
//   fs.open("./test.txt", "w", (error, data) => {
//     for (let i = 0; i < 100000; i++) {
//       fs.writeSync(data, `${i} `);
//     }
//
//     console.timeEnd("writeMany");
//   });
// })();

// execution time: 348.618ms
// const fs = require("node:fs");
// (async () => {
//   console.time("writeMany");
//   fs.open("./test.txt", "w", (error, data) => {
//     for (let i = 0; i < 100000; i++) {
//       fs.write(data, `${i} `, () => {});
//     }
//
//     console.timeEnd("writeMany");
//   });
// })();
