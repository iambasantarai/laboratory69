const amqp = require("amqplib");

async function receiveMail() {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("mail_queue", { durable: false });

    channel.consume("mail_queue", (msg) => {
      if (msg !== null) {
        console.log("Received message ", JSON.parse(msg.content));
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

receiveMail();
