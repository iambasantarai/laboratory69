const fs = require("node:fs/promises");

(async () => {
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      console.log(event.filename + " is changed.");
    }
  }
})();
