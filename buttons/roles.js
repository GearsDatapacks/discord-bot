module.exports = {
  name: 'role',
  run: async (client, interaction, params) => {
    const roleId = params[0];
    
    if (!interaction.guild) {
      return interaction.reply({content: 'You can only use this in a guild', ephemeral: true});
    }

    const role = await interaction.guild.roles.fetch(roleId);

    if (!role) {
      return interaction.reply({content: 'Role not found', ephemeral: true});
    }

    const member = await interaction.guild.members.fetch(interaction.member.id);

    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role.id);
      return interaction.reply({content: `Removed role ${role.name} from you`, ephemeral: true});
    }

    else {
      await member.roles.add(role.id);
      return interaction.reply({content: `Added role ${role.name} to you`, ephemeral: true});
    }
  }
}