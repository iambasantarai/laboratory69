const amqp = require("amqplib");

async function sendNotification() {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();

    const exchange = "new_product_launch";
    const exchangeType = "fanout";

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    const queue = await channel.assertQueue("", { exclusive: true });
    console.log("Waiting for msg: ", queue);

    await channel.bindQueue(queue.queue, exchange, "");

    channel.consume(queue.queue, (msg) => {
      if (msg !== null) {
        const product = JSON.parse(msg.content.toString());
        console.log("Sending SMS notification for product: ", product);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

sendNotification();
