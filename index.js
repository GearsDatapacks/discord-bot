const Discord = require('discord.js');

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ]
});

require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);

client.on('messageCreate', (message) => {
  if (message.content === 'hi') {
    message.reply('Hello There!');
  }
});