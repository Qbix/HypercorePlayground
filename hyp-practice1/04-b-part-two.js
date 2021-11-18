const { Client } = require('hyperspace');

const STATS_KEY =
  'c203a43ef16c777c2c780226a0e1595c05082679c164f905fa3ea37faa7376ed';

start();

async function start() {
  const { corestore, replicate } = new Client();

  const store = corestore();

  // // now get returns objects and append accepts objects
  // const core = store.get({ name: 'stats-collector', valueEncoding: 'json' });

  const core = store.get({ key: STATS_KEY, valueEncoding: 'json' });

  await replicate(core);

  // Wait for internal state to load
  await core.ready();

  console.log('Stats collector key is:', core.key.toString('hex'));

  // core.on('append', function () {
  //   // a new block of data was appended
  //   console.log('last block', core.get(core.length - 1));
  // });

  // Print the last block from the stats core.
  const lastBlock = await core.get(core.length - 1);
  console.log('lastBlock-', lastBlock);
}
