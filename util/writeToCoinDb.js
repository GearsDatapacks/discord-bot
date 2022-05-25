module.exports = async (client) => {
  const {writeFile} = require('fs/promises');

  const coinDb = {};

  client.coinDb.forEach((key, user) => {
    coinDb[user] = key;
  });

  try {
    const promise = writeFile('./data/coindb.json', JSON.stringify(coinDb), {});

    await promise;
  }

  catch (err) {
    console.error(err);
  }
}