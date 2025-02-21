const { default: axios } = require('axios');
const express = require('express');

const PORT = 9000;
const app = express();
app.use(express.json());

app.post('/ingest', async (req, res) => {
  const { ingestionId } = req.body;

  console.log('ingestion data: ', JSON.stringify(req.body));

  console.log('Simulating ingestion...');
  setTimeout(async () => {
    const brokerWebhookURL =
      'http://localhost:9001/webhooks/101/ingestion-status-update';
    try {
      console.log('Calling webhook');

      const payload = {
        eventType: 'ingestion-status-update',
        ingestionId,
        message: 'Ingstion completed.',
      };

      const result = await axios.post(brokerWebhookURL, {
        data: payload,
      });

      console.log('MSG from BROKER: ', result.data);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }, 5000);

  res.status(200).json({ message: 'Ingestion recorded.' });
});

app.listen(PORT, () => {
  console.log(`Producer listening on http://localhost:${PORT}`);
  console.log(`Send ingestion request at http://localhost:${PORT}/ingest`);
});
