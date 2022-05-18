const { getFiles } = require('../util/functions');

module.exports = (bot, reload) => {
  const {client} = bot;

  let slashCommands = getFiles('./slashcommands', '.js');

  if (slashCommands.length === 0) {
    console.log('No slash commands loaded');
  }

  slashCommands.forEach(f => {
    if (reload) {
      delete require.cache[require.resolve(`../slashcommands/${f}`)];
    }

    const slashcmd = require(`../slashcommands/${f}`);
    client.slashcommands.set(slashcmd.name, slashcmd);
  });
}