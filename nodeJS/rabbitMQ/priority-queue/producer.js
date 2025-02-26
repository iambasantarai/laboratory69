const amqp = require("amqplib");

async function sendMessage(data) {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();

    const exchange = "priority_queue_exchange";
    const exchangeType = "direct";
    const queue = "priority_queue";
    const routingKey = "pq_routing_key";

    await channel.assertExchange(exchange, exchangeType, { durable: true });
    await channel.assertQueue(queue, {
      durable: true,
      arguments: { "x-max-priority": 10 },
    });
    await channel.bindQueue(queue, exchange, routingKey);

    data.map((msg) => {
      channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)), {
        priority: msg.priority,
      });
    });

    console.log("All messages sent.");
    setTimeout(() => {
      connection.close();
    }, 5000);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

const data = [
  {
    msg: "Hello low: 1",
    priority: 1,
  },
  {
    msg: "Hello high: 8",
    priority: 8,
  },
  {
    msg: "Hello low: 2",
    priority: 2,
  },
];

sendMessage(data);
