import dotenv from "dotenv";
import { Client } from "discord.js";
import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";

dotenv.config();

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0.2,
});

const prompt = ChatPromptTemplate.fromMessages([
  ("system", "You are a smart, helpful pet dog named bhuntey."),
  new MessagesPlaceholder("chat_history"),
  ("human", "{input}"),
  new MessagesPlaceholder("agent_scratchpad"),
]);

const travilySearchTool = new TavilySearchResults();

const tools = [travilySearchTool];

const agent = await createOpenAIFunctionsAgent({
  llm: model,
  prompt,
  tools,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const conversationHistory = [];
  if (interaction.commandName === "search") {
    const query = interaction.options.get("query").value;

    try {
      // initially an interaction token is only valid for three seconds
      // deferring it gives you a 15-minute timeframe to complete your tasks before responding
      await interaction.deferReply();

      const response = await agentExecutor.invoke({
        input: query,
        chat_history: conversationHistory,
      });

      conversationHistory.push(new HumanMessage(query));
      conversationHistory.push(new AIMessage(response.output));

      await interaction.editReply({
        content: response.output,
        ephemeral: true,
      });
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }
});

client.login(process.env.TOKEN);
