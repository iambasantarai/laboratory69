const amqp = require("amqplib");

async function sendNotification(routingKey, msg) {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();
    const exchange = "notification_exchange";
    const exchangeType = "topic";

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
    console.log("[x] Sent '%s': '%s'", routingKey, JSON.stringify(msg));
    console.log(
      `msg was sent with routing key: ${routingKey} and message: ${JSON.stringify(msg)}`,
    );

    setTimeout(() => {
      connection.close();
    }, 5000);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

sendNotification("order.placed", { orderId: 123, status: "placed" });
sendNotification("payment.processed", { paymentId: 432, status: "processed" });
