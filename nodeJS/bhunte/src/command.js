import dotenv from "dotenv";
import { ApplicationCommandOptionType, REST, Routes } from "discord.js";

dotenv.config();

const commands = [
  {
    name: "bhunte",
    description: "Call bhunte.",
  },
  {
    name: "search",
    description: "Performs web search.",
    options: [
      {
        name: "query",
        description: "Your query to search on the web.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
