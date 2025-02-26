const amqp = require("amqplib");

async function consueNewVideoNotifications() {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();

    const exchange = "header_exchange";
    const exchangeType = "headers";

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    const q = await channel.assertQueue("", { exclusive: true });
    console.log("Waiting for new video notification");

    await channel.bindQueue(q.queue, exchange, "", {
      "x-match": "any",
      "notification-type": "new_video",
      "content-type": "video",
    });

    channel.consume(q.queue, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        console.log("Received new video notification: ", content);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

consueNewVideoNotifications();
