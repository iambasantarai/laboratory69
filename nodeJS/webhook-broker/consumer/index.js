const express = require("express");

const PORT = 9002;

const app = express();
app.use(express.json());

app.post("/webhooks/ingestion-status", (req, res) => {
  const payload = req.body;
  console.log("Forwarded webhook call received from BROKER: ", payload);

  res.status(200).json({
    message: "Webhook call received.",
  });
});

app.listen(PORT, () => {
  console.log(`Consumer listening on http://localhost:${PORT}`);
  console.log(
    `Send updates at http://localhost:${PORT}/webhooks/ingestion-status`,
  );
});
