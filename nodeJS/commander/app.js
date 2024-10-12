const fs = require("node:fs/promises");
const { Buffer } = require("node:buffer");

(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r");

  const watcher = fs.watch("./command.txt");

  commandFileHandler.on("change", async () => {
    const size = (await commandFileHandler.stat()).size;
    const fileBuff = Buffer.alloc(size);
    const offset = 0;
    const length = fileBuff.byteLength;
    const position = 0;

    await commandFileHandler.read(fileBuff, offset, length, position);

    console.log(fileBuff.toString("utf-8"));
  });

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
