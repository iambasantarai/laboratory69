import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  message.reply({
    content: "Hey, how can i help you?",
  });
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("BHAW BHAW!");
});

client.login(process.env.TOKEN);
