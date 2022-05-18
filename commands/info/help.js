module.exports = {
  name: 'help',
  category: 'info',
  permissions: [],
  devOnly: false,
  run: async ({client, message, args}) => {
    message.reply('There are no commands yet');
  }
};