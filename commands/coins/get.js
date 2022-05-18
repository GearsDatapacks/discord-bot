module.exports = {
  name: 'get',
  category: 'coins',
  permissions: [],
  devOnly: false,
  run: async ({client, message, args}) => {
    let memberCoins = client.coinDb.get(message.member.user.tag) || 0;
    memberCoins += Number(args[0]);
    client.coinDb.set(message.member.user.tag, memberCoins);
    message.reply(`You now have ${memberCoins} ⚙`);
  }
};