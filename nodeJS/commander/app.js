const fs = require("node:fs/promises");
const { Buffer } = require("node:buffer");

(async () => {
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_CONTENT_TO_FILE = "add to the file";

  const createFile = async (path) => {
    try {
      path = path.trim();

      const existingFileHandler = await fs.open(path, "r");
      existingFileHandler.close();

      return console.log(`${path} already exists.`);
    } catch (error) {
      const newFileHandler = await fs.open(path, "w");
      console.log(`${path} has been created.`);
      newFileHandler.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      path = path.trim();

      await fs.unlink(path);
      console.log("File has been removed.");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("No file at this path to remove.");
      } else {
        console.log("Error removing file.");
      }
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      oldPath = oldPath.trim();
      newPath = newPath.trim();

      await fs.rename(oldPath, newPath);

      console.log("File has been renamed.");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          "No file at this path to rename or the destination doesn't exist.",
        );
      } else {
        console.log("Error renaming file.");
      }
    }
  };

  let prevContent;
  const addContentToFile = async (path, content) => {
    if (prevContent === content) return;

    try {
      path = path.trim();

      const fileHandle = await fs.open(path, "a");
      fileHandle.write(content);
      prevContent = content;
      fileHandle.close();

      console.log("Content has been added to file.");
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

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

    /*
     * CREATE FILE
     * Example command: create a file <path>
     */
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    /*
     * DELETE FILE
     * Example command: delete a file <path>
     */
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    /*
     * RENAME FILE
     * Example command: rename the file <old-path> to <new-path>
     */
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);

      renameFile(oldFilePath, newFilePath);
    }

    /*
     * ADD CONTENT TO FILE
     * Example command: add to the file <path> this content: <content>
     */
    if (command.includes(ADD_CONTENT_TO_FILE)) {
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_CONTENT_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);

      addContentToFile(filePath, content);
    }
  });

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
