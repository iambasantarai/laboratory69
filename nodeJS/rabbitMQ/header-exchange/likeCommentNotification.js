const amqp = require("amqplib");

async function consueLikeCommentNotifications() {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();

    const exchange = "header_exchange";
    const exchangeType = "headers";

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    const q = await channel.assertQueue("", { exclusive: true });
    console.log("Waiting for any matching notification");

    await channel.bindQueue(q.queue, exchange, "", {
      "x-match": "any",
      "notification-type-comment": "comment",
      "notification-type-like": "like",
    });

    channel.consume(q.queue, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        console.log("Received like/comment notification: ", content);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

consueLikeCommentNotifications();
