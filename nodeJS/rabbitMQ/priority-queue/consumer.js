const amqp = require("amqplib");

async function receiveMsg() {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();

    const queue = "priority_queue";

    await channel.assertQueue(queue, {
      durable: true,
      arguments: { "x-max-priority": 10 },
    });

    console.log(`Waiting for messages in ${queue}.`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`Receive: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

receiveMsg().catch(console.error);
