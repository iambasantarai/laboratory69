const amqp = require("amqplib");

async function receiveMessage() {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();
    const exchange = "notification_exchange";
    const queue = "payment_queue";

    await channel.assertExchange(exchange, "topic", { durable: true });
    await channel.assertQueue(queue, { durable: true });

    await channel.bindQueue(queue, exchange, "payment.*");

    console.log("Waiting for message");
    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(
            `[Payment Notification] Msg was consumed! With routing key: ${msg.fields.routingKey} and content: ${msg.content}.`,
          );
        }
        channel.ack(msg);
      },
      { noAck: false },
    );
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

receiveMessage();
