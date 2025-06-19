require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const TelegramBot = require('node-telegram-bot-api');

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

discordClient.once('ready', () => {
  console.log(`Discord bot logged in as ${discordClient.user.tag}`);
});

discordClient.on('messageCreate', (message) => {
//   if (message.channel.id === process.env.DISCORD_CHANNEL_ID && !message.author.bot) {
    if (message.channel.id === process.env.DISCORD_CHANNEL_ID ) {
    // const content = `**${message.author.username}**: ${message.content}`;
    // Use Markdown formatting for Telegram
    const content = `${message.content}`;
    telegramBot.sendMessage(process.env.TELEGRAM_CHANNEL_ID, content, { parse_mode: 'Markdown' });
  }
});

discordClient.login(process.env.DISCORD_BOT_TOKEN);
