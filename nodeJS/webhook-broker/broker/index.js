const express = require('express');
const { default: axios } = require('axios');

const PORT = 9001;

const app = express();
app.use(express.json());

const applicationId = 101;
const eventType = 'ingestion-status-update';

app.post(`/webhooks/${applicationId}/${eventType}`, async (req, res) => {
  const payload = req.body;
  const consumerURL = 'http://localhost:9002/webhooks/ingestion-status';

  try {
    const result = await axios.post(consumerURL, { payload });

    console.log('MSG from CONSUMER: ', result.data);
  } catch (error) {
    console.log('ERROR: ', error);
  }

  res.status(200).json({
    message: 'Webhook event forwarded.',
    consumerURL: consumerURL.toString(),
    payload,
  });
});

app.listen(PORT, () => {
  console.log(`Broker listening on http://localhost:${PORT}`);
  console.log(
    `Send request at http://localhost:${PORT}/webhooks/${applicationId}/${eventType} to forward webhook event.`,
  );
});
