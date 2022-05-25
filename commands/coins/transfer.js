module.exports = {
  name: 'transfer',
  category: 'coins',
  permissions: [],
  aliases: [],
  devOnly: false,
  run: ({client, message, args}) => {
    const write = require('../../util/writeToCoinDb');
    const memberToLose = message.author;
    let memberMinusCoins = client.coinDb.get(memberToLose.id) || 0;
    const member = message.mentions.users.first();

    if (!member) {
      return message.channel.send('Please specify a user to give ⚙');
    }

    let memberCoins = client.coinDb.get(member.id) || 0;

    if (memberMinusCoins < amount) {
      return message.channel.send(`You do not have enough ⚙ to give to ${member.username}`);
    }


    const amount = Math.floor(args[1]);

    if (!amount) {
      return message.channel.send('Please specify an amount');
    }

    memberCoins += Number(amount);
    memberMinusCoins -= Number(amount);
    client.coinDb.set(member.id, memberCoins);
    client.coinDb.set(memberToLose.id, memberMinusCoins);
    message.channel.send(`Gave ${member.username} ${amount} ⚙`);

    write(client);
  }
};