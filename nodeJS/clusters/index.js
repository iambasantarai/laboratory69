const express = require('express');

const app = express();
const PORT = 3000;

app.get('/heavy', (req, res) => {
  let total = 0;
  for (let i = 0; i < 5_000_000; i++) {
    total++;
  }
  res.send(`The result of the CPU intensive task is ${total}\n`);
});

app.listen(PORT, () => {
  console.log(`PID : ${process.pid}`);
  console.log(`Listening on http://localhost:${PORT}`);
});
