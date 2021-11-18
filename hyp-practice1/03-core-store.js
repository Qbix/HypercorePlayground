const { Client } = require('hyperspace');
const stats = require('process-top')(); // instantiate a stats collector

start();

async function start() {
  const c = new Client();

  // Ask for the RPC server status to see that everything works
  console.log(await c.status());

  const store = c.corestore();

  // Core is a Hypercore instance, which is an append-only log
  const core = store.get({ name: 'exercise-02 ' });

  // setInterval(function () {
  //   alert('Hello');
  // }, 3000);

  await core.append('block #' + core.length);

  // Wait for internal state to load
  await core.ready();

  console.log(core); // Prints out details like the length of the core, byteLength, the public key etc.

  await core.append('block #' + core.length);

  for (let i = 0; i < core.length; i++) {
    // print the block stored at i
    console.log(await core.get(i));
  }

  console.log(stats.toJSON()); // get stats
}
