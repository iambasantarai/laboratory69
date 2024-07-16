const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const link = await new Promise((resolve, reject) => {
    rl.question('Enter a website link you want to crawl: ', resolve);
  });
  rl.close();

  console.log(`Crawling ${link}.`);
}

init();
