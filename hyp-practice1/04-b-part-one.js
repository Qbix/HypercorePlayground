const { Client } = require('hyperspace');
const top = require('process-top')();
console.log('top', top);

start();

async function start() {
  const { corestore, replicate } = new Client();

  const store = corestore();

  // // now get returns objects and append accepts objects
  // const core = store.get({ name: 'stats-collector', valueEncoding: 'json' });

  const core = store.get({
    name: 'first-stats-collector',
    valueEncoding: 'json',
  });

  // Wait for internal state to load
  await core.ready();

  console.log('Stats collector key is:', core.key.toString('hex'));

  core.on('append', function () {
    // a new block of data was appended
    console.log('last block', core.get(core.length - 1));
  });

  await replicate(core);

  setInterval(() => {
    core
      .append(top.toJSON())
      .catch((err) => console.error('Could not append stats'));
  }, 5000);
}
