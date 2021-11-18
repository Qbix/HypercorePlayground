const { Client } = require('hyperspace');
const top = require('process-top')();

start();

async function start() {
  const c = new Client();

  // Ask for the RPC server status to see that everything works
  console.log(await c.status());

  const store = c.corestore();

  // now get returns objects and append accepts objects
  const core = store.get({ name: 'stats-collector', valueEncoding: 'json' });

  // Wait for internal state to load
  await core.ready();

  console.log('Stats collector key is:', core.key.toString('hex'));

  core.on('append', function () {
    // a new block of data was appended
    console.log('new block appended', core);
  });

  setInterval(() => {
    core
      .append(top.toJSON())
      .catch((err) => console.error('Could not append stats'));
  }, 2000);
}
