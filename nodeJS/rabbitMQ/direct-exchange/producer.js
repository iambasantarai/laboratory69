const amqp = require("amqplib");

async function sendMail() {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();
    const exchange = "mail_exchange";
    const routingKeyForSubUser = "send_mail_to_subscribed_users";
    const routingKeyForNormalUser = "send_mail_to_users";

    const message = {
      to: "usr2@domain.com",
      from: "usr0@domain.com",
      subject: "Hello TP Mail",
      body: "Hello usr1 !!!",
    };

    await channel.assertExchange(exchange, "direct", { durable: false });
    await channel.assertQueue("send_mail_to_subscribed_users", {
      durable: false,
    });
    await channel.assertQueue("send_mail_to_users", { durable: false });

    await channel.bindQueue(
      "send_mail_to_subscribed_users",
      exchange,
      routingKeyForSubUser,
    );
    await channel.bindQueue(
      "send_mail_to_normal_users",
      exchange,
      routingKeyForNormalUser,
    );

    channel.publish(
      exchange,
      routingKeyForNormalUser,
      Buffer.from(JSON.stringify(message)),
    );
    channel.publish(
      exchange,
      routingKeyForSubUser,
      Buffer.from(JSON.stringify(message)),
    );

    console.log("Mail data was sent", message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

sendMail();
