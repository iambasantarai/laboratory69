const amqp = require("amqplib");

async function announceLaunch(product) {
  try {
    const connection = await amqp.connect("amqp://rmq_usr:rmq_pass@localhost");
    const channel = await connection.createChannel();

    const exchange = "new_product_launch";
    const exchangeType = "fanout";

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    const msg = JSON.stringify(product);

    // persistent:true -> any problem occurs, msg will stored in local disk
    // routing key is ignored
    channel.publish(exchange, "", Buffer.from(msg), { persistent: true });
    console.log("Msg sent: ", msg);

    setTimeout(() => {
      connection.close();
    }, 5000);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

announceLaunch({ id: 1234, name: "Instinct", price: 5500 });
