module.exports = {
  name: 'give',
  category: 'coins',
  permissions: ['ADMINISTRATOR'],
  aliases: [],
  devOnly: false,
  run: ({client, message, args}) => {
    const write = require('../../util/writeToCoinDb');
    const member = message.mentions.users.first();

    if (!member) {
      return message.channel.send('Please specify a user to give ⚙');
    }

    const amount = Math.floor(args[1]);

    if (!amount) {
      return message.channel.send('Please specify an amount');
    }

    let memberCoins = client.coinDb.get(member.id) || 0;
    memberCoins += amount;
    client.coinDb.set(member.id, memberCoins);
    message.channel.send(`${member.username} now has ${memberCoins} ⚙`);

    write(client);
  }
};