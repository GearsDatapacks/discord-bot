module.exports = {
  name: 'search',
  category: 'coins',
  permissions: [],
  cooldown: 600,
  aliases: [],
  devOnly: false,
  run: ({client, message, args}) => {
    const write = require('../../util/writeToCoinDb');
    const place = args[0];

    if (!place) {
      return message.channel.send('Please specify a place to search');
    }

    const member = message.author
    let memberCoins = client.coinDb.get(member.id) || 0;
    const amount = Math.floor(Math.random() * (400 - 100) + 1) + 100;
    memberCoins += amount;
    client.coinDb.set(member.id, memberCoins);
    message.channel.send(`You searched your ${place} and found ${amount} ⚙`);

    write(client);
  }
};