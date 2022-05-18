const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const messageCreate = require('../../events/messageCreate');

module.exports = {
  name: 'roleselector',
  category: 'test',
  devOnly: true,
  run: async ({client, message, args}) => {
    message.channel.send({
      embeds: [
        new MessageEmbed().setTitle('Select Role').setDescription('Select roles from the buttons below').setColor('BLUE')
      ],
      components: [
        new MessageActionRow().addComponents([
          new MessageButton().setCustomId('role-976470920522784849').setStyle('PRIMARY').setLabel('test')
        ])
      ]
    });
  }
}