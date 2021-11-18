const { Client } = require('hyperspace');

start();

async function start() {
  const c = new Client();

  // Ask for the RPC server status to see that everything works
  console.log(await c.status());

  const store = c.corestore();

  // Core is a Hypercore instance, which is an append-only log
  const core = store.get({ name: 'exercise-02 ' });

  // Wait for internal state to load
  await core.ready();

  console.log(core); // Prints out details like the length of the core, byteLength, the public key etc.
}
