const amqp = require("amqplib");

async function sendNotification(headers, msg) {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();

    const exchange = "header_exchange"; // notification_exchange or according to use case
    const exchangeType = "headers";

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    // routing key is ignored
    channel.publish(exchange, "", Buffer.from(msg), {
      persistent: true,
      headers: headers,
    });

    console.log("Notification sent with headers: ", JSON.stringify(headers));

    setTimeout(() => {
      connection.close();
    }, 3000);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

sendNotification(
  {
    "x-match": "all",
    "notification-type": "new_video",
    "content-type": "video",
  },
  "New tutorial uploaded.",
);
sendNotification(
  {
    "x-match": "all",
    "notification-type": "live_stream",
    "content-type": "gaming",
  },
  "Streamer is live now.",
);
sendNotification(
  {
    "x-match": "any",
    "notification-type-comment": "comment",
    "content-type": "vlog",
  },
  "New comment on your vlog.",
);
sendNotification(
  {
    "x-match": "any",
    "notification-type-like": "like",
    "content-type": "vlog",
  },
  "Someone liked your comment.",
);
