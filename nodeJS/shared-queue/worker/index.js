console.log('--- WORKER APP ---');

const { Worker } = require('bullmq');

const redisOptions = { host: 'localhost', port: 6379, password: 'root' };

const workerHandler = async (job) => {
  console.log(`Processing batch ${job.batch} of job ${job.id}`);

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
      console.log('Content ingested to LLM.');
    }, 5 * 1000),
  );
};

const ingestionWorker = new Worker(
  'shared-queue-for-ingestion',
  workerHandler,
  {
    connection: redisOptions,
  },
);

ingestionWorker.on('error', (error) => {
  console.error('Worker error: ', error);
});
