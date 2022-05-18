const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_MEMBERS',
    'GUILD_MESSAGE_REACTIONS'
  ]
});

let bot = {
  client,
  prefix: ']',
  owners: ['976102272369033286']
};

const guildId = '976114427793408081';

client.slashcommands = new Discord.Collection();

client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload);

client.loadSlashCommands(bot, false);

client.on('ready', async () => {
  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    return console.error('Guild not found');
  }

  await guild.commands.set([...client.slashcommands.values()]);
  console.log(`Succesfully loaded ${client.slashcommands.size} slash commands`);
  process.exit(0);
});

module.exports = bot;

client.login(process.env.TOKEN);