module.exports = {name: 'help',
  name: 'balance',
  category: 'coins',
  permissions: [],
  aliases: ['bal'],
  devOnly: false,
  run: ({client, message, args}) => {
    const member = message.mentions.users.first() || message.author;

    const memberCoins = client.coinDb.get(member.id) || 0;
    message.channel.send(`${member.username} has ${memberCoins} ⚙`);
  }
};