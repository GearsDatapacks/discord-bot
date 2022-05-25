const Discord = require('discord.js');

const cooldowns = new Map();

module.exports = {
  name: 'messageCreate',
  run: async function runAll (bot, message) {
    const {client, prefix, owners} = bot;

    if (!message.guild) {
      return;
    }

    if (message.author.bot) {
      return;
    }

    if (!message.content.startsWith(prefix)) {
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdstr = args.shift().toLowerCase();

    let command = client.commands.get(cmdstr) || client.commands.find(a => a.aliases && a.aliases.includes(cmdstr));
    if (!command) {
      return;
    }

    let member = message.member;

    if (command.devOnly && !owners.includes(member.id)) {
      return message.reply('This command is only available to the bot owners');
    }

    if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
      return message.channel.send('You do not have permission to use this command');
    }

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    console.log(cooldowns);

    const currentTime = Date.now();
    const timeStamps = cooldowns.get(command.name);
    const cooldownTime = command.cooldown * 1000;

    if (timeStamps.has(message.author.id)) {
      const cooldownEnd = timeStamps.get(message.author.id) + cooldownTime;

      if (currentTime < cooldownEnd) {
        let timeLeft = (cooldownEnd - currentTime) / 1000;
        let timeLeftStr = 'seconds';

        if (timeLeft > 60) {
          timeLeft /= 60;
          timeLeftStr = 'minutes';

          if (timeLeft > 60) {
            timeLeft /= 60;
            timeLeftStr = 'hours';
          }
        }

        return message.channel.send(`You need to wait ${timeLeft.toFixed(1)} more ${timeLeftStr} before using that command`);
      }
    }

    timeStamps.set(message.author.id, currentTime);
    setTimeout(() => {timeStamps.delete(message.author.id)}, cooldownTime);

    try {
      await command.run({...bot, message, args});
    }

    catch (err) {
      let errMsg = err.toString();

      if (errMsg.startsWith('?')) {
        errMsg = errMsg.slice(1);
        await message.reply(errMsg);
      }

      else {
        console.error(err);
      }
    }
  }
}