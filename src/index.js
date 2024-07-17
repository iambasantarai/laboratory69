const readline = require('node:readline');
const { crawlPage } = require('./crawl');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const link = await new Promise((resolve, reject) => {
    rl.question('Enter a website link you want to crawl: ', resolve);
  });
  rl.close();

  console.log(`Crawling started for ${link}.`);

  const pages = await crawlPage(link, link, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

init();
