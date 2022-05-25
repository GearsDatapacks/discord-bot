const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_MEMBERS'
  ]
});

let bot = {
  client,
  prefix: ']',
  owners: ['624197866595811328']
};

const LOAD_SLASH = process.argv[2] == 'load';

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashcommands = new Discord.Collection();
client.buttons = new Discord.Collection();
client.coinDb = new Discord.Collection();


client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload);
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload);
client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload);
client.loadButtons = (bot, reload) => require('./handlers/buttons')(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);
client.loadSlashCommands(bot, false);
client.loadButtons(bot, false);

module.exports = bot;

client.login(process.env.TOKEN);

/*

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.content === 'hi') {
    message.reply('Hello There!');
  }
});

const welcomeChannelId = 976122554181910559

client.on('guildMemberAdd', (member => {
  member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Welcome to the server!`);
}));*/