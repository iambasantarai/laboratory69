import dotenv from "dotenv";
import { Client } from "discord.js";

dotenv.config();

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (!message.mentions.users.has(client.user.id)) return;

  message.reply({
    content: "Hey, how can i help you?",
  });
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("BHAW BHAW!");
});

client.login(process.env.TOKEN);
