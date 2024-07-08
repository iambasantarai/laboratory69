const express = require('express');
const { Worker } = require('worker_threads');

const app = express();

const PORT = 3000;

app.get('/non-blocking', (req, res) => {
  res.status(200).send('Served by non-blocking route.');
});

app.get('/blocking', async (req, res) => {
  const worker = new Worker('./worker.js');

  worker.on('message', (data) => {
    res.status(200).send(`Result is ${data}`);
  });

  worker.on('error', (msg) => {
    res.status(404).send(`An error occurred: ${msg}`);
  });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
