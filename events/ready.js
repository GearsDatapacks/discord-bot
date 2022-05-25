module.exports = {
  name: 'ready',
  run: async (bot) => {
    const {client} = bot;
    const fs = require('fs');

    console.log(`Logged in as ${bot.client.user.tag}`);

    const coinDb = JSON.parse(fs.readFileSync('./data/coindb.json').toString());
    Object.keys(coinDb).forEach(key => {
      client.coinDb.set(key, coinDb[key]);
    });
  }
}