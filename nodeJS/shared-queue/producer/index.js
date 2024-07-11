console.log('--- PRODUCER APP ---');

const { Queue } = require('bullmq');

const redisOptions = { host: 'localhost', port: 6379, password: 'root' };

const ingestionQueue = new Queue('shared-queue-for-ingestion', {
  connection: redisOptions,
});

let contents = [
  'The cat perched on the windowsill, watching the birds outside.',
  'She found an old photograph in the attic, reminding her of childhood summers.',
  'The sun set behind the mountains, painting the sky in shades of orange and pink.',
  'He decided to take a different route to work and discovered a charming café.',
  'The ancient oak tree stood tall, its branches reaching out like welcoming arms.',
  'She practiced the piano for hours, perfecting the piece for her recital.',
  "The smell of freshly baked bread filled the kitchen, making everyone's mouth water.",
  'He read the mysterious letter again, trying to decipher its hidden message.',
  'The children laughed and played in the park, their joy contagious to all around.',
  'She admired the intricate design of the tapestry, marveling at the craftsmanship.',
];

async function init() {
  try {
    const batch = Math.floor(Math.random() * 100);
    const randomIndex = Math.floor(Math.random() * contents.length);

    const res = await ingestionQueue.add('Ingest content to LLM', {
      batch,
      content: contents[randomIndex],
    });

    console.log(
      `BATCH[${batch}]: Job added to the queue for ingestion with id ${res.id} `,
    );
  } catch (error) {
    console.error('Error adding job to the queue: ', error);
  }
}

init();
