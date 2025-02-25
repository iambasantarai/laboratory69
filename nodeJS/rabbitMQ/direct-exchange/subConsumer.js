const amqp = require("amqplib");

async function receiveMail() {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("send_mail_to_subscribed_users", {
      durable: false,
    });

    channel.consume("send_mail_to_subscribed_users", (msg) => {
      if (msg !== null) {
        console.log(
          "Received message for subscribed user: ",
          JSON.parse(msg.content),
        );
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

receiveMail();
