const fs = require("node:fs/promises");
const { Buffer } = require("node:buffer");

(async () => {
  const createFile = async (path) => {
    try {
      const existingFileHandler = await fs.open(path, "r");
      existingFileHandler.close();

      return console.log(`${path} already exists.`);
    } catch (error) {
      const newFileHandler = await fs.open(path, "w");
      console.log(`${path} has been created.`);
      newFileHandler.close();
    }
  };

  const CREATE_FILE = "create a file";

  const commandFileHandler = await fs.open("./command.txt", "r");

  const watcher = fs.watch("./command.txt");

  commandFileHandler.on("change", async () => {
    const size = (await commandFileHandler.stat()).size;
    const fileBuff = Buffer.alloc(size);
    const offset = 0;
    const length = fileBuff.byteLength;
    const position = 0;

    await commandFileHandler.read(fileBuff, offset, length, position);

    const command = fileBuff.toString("utf-8");

    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
  });

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
