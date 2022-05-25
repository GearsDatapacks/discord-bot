module.exports = {
  name: 'help',
  category: 'info',
  permissions: [],
  cooldown: 20,
  aliases: ['h'],
  devOnly: false,
  run: async ({client, message, args}) => {
    message.channel.send('There are no commands yet');
  }
};