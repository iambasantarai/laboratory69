const { Queue } = require("bullmq");

const redisOptions = { host: 'localhost', port: 6379, password: 'root' };

const ingestionQueue = new Queue('ingest-scrapped', {
    connection: redisOptions
});

async function init() {
    try {
        const res = await ingestionQueue.add('Ingest scrapped content', 
            { content: 'This content is scrapped from web.' }
        );

        console.log("Job added to the queue for ingestion ", res.id);
    } catch (error) {
        console.error("Error adding job to the queue: ", error);
    }
}

init();

