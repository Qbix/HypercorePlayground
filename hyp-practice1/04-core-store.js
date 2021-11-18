const { Client } = require('hyperspace');
const top = require('process-top')();
console.log('top', top);
const STATS_KEY =
  '7a326eb09339a3fbb716b845fd3d52082a9f61e459b41ccc161c3d21583e5bef';

start();

async function start() {
  const { corestore, network, replicate } = new Client();

  const store = corestore();

  // // now get returns objects and append accepts objects
  // const core = store.get({ name: 'stats-collector', valueEncoding: 'json' });

  const core = store.get(STATS_KEY, { valueEncoding: 'json' });

  // Wait for internal state to load
  await core.ready();

  console.log('Stats collector key is:', core.key.toString('hex'));

  core.on('append', function () {
    // a new block of data was appended
    console.log('last block', core.get(core.length - 1));
  });

  setInterval(() => {
    core
      .append(top.toJSON())
      .catch((err) => console.error('Could not append stats'));
  }, 2000);
}
