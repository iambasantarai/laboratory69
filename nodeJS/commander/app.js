const fs = require("node:fs/promises");
const { Buffer } = require("node:buffer");

(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r");

  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      console.log(event.filename + " is changed.");

      const size = (await commandFileHandler.stat()).size;
      const fileBuff = Buffer.alloc(size);
      const offset = 0;
      const length = fileBuff.byteLength;
      const position = 0;

      const content = await commandFileHandler.read(
        fileBuff,
        offset,
        length,
        position,
      );

      console.log(content);
    }
  }
})();
